const { Op } = require('sequelize');
const { Task, User, Workspace } = require('../models');
const path = require('path');
const fs = require('fs');

function parseJson(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return [raw]; }
}

function toDict(task) {
  return {
    id: task.id,
    title: task.title,
    taskType: task.taskType || 'basic',
    description: task.description || '',
    tags: parseJson(task.tags),
    urls: parseJson(task.urls),
    images: parseJson(task.images),
    files: parseJson(task.files),
    deadline: task.deadline,
    authorId: task.authorId,
    authorName: task.authorName || 'Utilisateur',
    authorUsername: task.authorUsername || '',
    authorAvatar: task.authorAvatar || '',
    status: task.status,
    priority: task.priority,
    workspaceId: task.workspaceId,
    workspaceName: task.workspaceName || '',
    created_at: task.created_at || '',
    reminder: task.reminder || '',
  };
}

async function enrich(task) {
  const t = task.toJSON ? task.toJSON() : task;
  const author = t.authorId ? await User.findByPk(t.authorId) : null;
  const workspace = t.workspaceId ? await Workspace.findByPk(t.workspaceId) : null;
  return {
    ...t,
    tags: parseJson(t.tags),
    urls: parseJson(t.urls),
    images: parseJson(t.images),
    files: parseJson(t.files),
    authorName: (author && (author.name || author.username)) || 'Utilisateur',
    authorUsername: author ? author.username : '',
    authorAvatar: author ? (author.avatar || '') : '',
    workspaceName: workspace ? workspace.name : '',
  };
}

exports.list = async (req, res) => {
  const tasks = await Task.findAll({ order: [['id', 'DESC']] });
  const enriched = await Promise.all(tasks.map(enrich));
  res.json(enriched);
};

exports.get = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const result = await enrich(task);
  res.json(result);
};

exports.byWorkspace = async (req, res) => {
  const tasks = await Task.findAll({ where: { workspaceId: req.params.id }, order: [['id', 'DESC']] });
  const enriched = await Promise.all(tasks.map(enrich));
  res.json(enriched);
};

exports.upcomingReminders = async (req, res) => {
  const windowMin = parseInt(req.query.window) || 5;
  const now = new Date();
  const end = new Date(now.getTime() + windowMin * 60000);
  const all = await Task.findAll();
  const upcoming = [];
  for (const task of all) {
    if (!task.reminder || task.status === 'done') continue;
    const parsed = new Date(task.reminder);
    if (isNaN(parsed.getTime())) continue;
    if (parsed >= now && parsed <= end) {
      upcoming.push(await enrich(task));
    }
  }
  res.json(upcoming);
};

exports.create = async (req, res) => {
  const data = req.body;
  if (!data.workspaceId) {
    return res.status(400).json({ error: 'Le projet est requis pour creer une tache' });
  }
  if (!data.reminder) {
    return res.status(400).json({ error: 'Le rappel est requis pour creer une tache' });
  }
  const task = await Task.create({
    title: data.title,
    tags: data.tags,
    description: data.description || '',
    urls: data.urls || '[]',
    deadline: data.deadline,
    authorId: data.authorId,
    images: data.images || '[]',
    files: data.files || '[]',
    taskType: data.taskType || 'basic',
    priority: data.priority || 1,
    status: data.status || 'todo',
    workspaceId: data.workspaceId,
    reminder: data.reminder,
    created_at: new Date().toISOString(),
  });
  const result = await enrich(task);
  res.json({ id: task.id, task: result, message: 'Task added' });
};

exports.update = async (req, res) => {
  const data = req.body;
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if ('images' in data) {
    const oldImages = parseJson(task.images);
    const newImages = typeof data.images === 'string' ? parseJson(data.images) : data.images;

    const extractFn = (img) => {
      if (img && typeof img === 'object') return img.filename || '';
      if (typeof img === 'string') return img.split('/').pop();
      return '';
    };

    const oldFilenames = new Set(oldImages.map(extractFn).filter(Boolean));
    const newFilenames = new Set(newImages.map(extractFn).filter(Boolean));
    const imagesDir = path.resolve(__dirname, '../../images');

    for (const fname of oldFilenames) {
      if (!newFilenames.has(fname)) {
        const fpath = path.join(imagesDir, fname);
        if (fs.existsSync(fpath)) fs.unlinkSync(fpath);
      }
    }
  }

  for (const key of Object.keys(data)) {
    if (key !== 'id' && task[key] !== undefined) {
      task[key] = data[key];
    }
  }
  await task.save();
  const result = await enrich(task);
  res.json(result);
};

exports.remove = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.destroy();
  res.json({ message: 'Task deleted' });
};
