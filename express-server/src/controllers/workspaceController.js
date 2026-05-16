const { Workspace, Task } = require('../models');

exports.list = async (req, res) => {
  const workspaces = await Workspace.findAll();
  res.json(workspaces.map(w => ({
    id: w.id,
    name: w.name,
    description: w.description,
    iconPath: w.iconPath,
  })));
};

exports.get = async (req, res) => {
  const workspace = await Workspace.findByPk(req.params.id);
  if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
  res.json({
    id: workspace.id,
    name: workspace.name,
    description: workspace.description,
    iconPath: workspace.iconPath,
  });
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.name) {
      return res.status(400).json({ error: 'Le nom du projet est requis' });
    }
    const workspace = await Workspace.create({
      name: data.name,
      description: data.description || '',
      iconPath: data.iconPath || '[NO IMAGE]',
    });
    res.json({ id: workspace.id, message: 'Workspace added' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const workspace = await Workspace.findByPk(req.params.id);
  if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
  if (data.name !== undefined) workspace.name = data.name;
  if (data.description !== undefined) workspace.description = data.description;
  if (data.iconPath !== undefined) workspace.iconPath = data.iconPath;
  await workspace.save();
  res.json({ message: 'Workspace updated' });
};

exports.remove = async (req, res) => {
  await Task.destroy({ where: { workspaceId: req.params.id } });
  await Workspace.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Workspace deleted' });
};
