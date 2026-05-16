const { User } = require('../models');

function serialize(user) {
  let tags = [];
  try { tags = JSON.parse(user.tags || '[]'); } catch {}
  return {
    id: user.id,
    name: user.name || user.username,
    username: user.username,
    email: user.email,
    avatar: user.avatar || '',
    tags,
    location: user.location || '',
  };
}

exports.list = async (req, res) => {
  const users = await User.findAll();
  res.json(users.map(serialize));
};

exports.count = async (req, res) => {
  const count = await User.count();
  res.send(String(count));
};

exports.get = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(serialize(user));
};

exports.create = async (req, res) => {
  const data = req.body;
  const username = (data.username || '').trim();
  const email = (data.email || '').trim();
  const password = data.password || '';
  const name = (data.name || username).trim();

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: 'Username, email and password are required' });
  }
  if (await User.findOne({ where: { username } })) {
    return res.status(409).json({ success: false, error: 'Ce nom d\'utilisateur est deja pris' });
  }
  if (await User.findOne({ where: { email } })) {
    return res.status(409).json({ success: false, error: 'Cet email est deja utilise' });
  }
  try {
    const user = await User.create({
      name,
      username,
      email,
      password,
      avatar: data.avatar || '',
      tags: JSON.stringify(Array.isArray(data.tags) ? data.tags : []),
      location: data.location || '',
    });
    res.json({ success: true, message: 'User created', user: serialize(user) });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

exports.update = async (req, res) => {
  const data = req.body || {};
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });

  const { username, email } = data;
  if (username && await User.findOne({ where: { username, id: { [require('sequelize').Op.ne]: user.id } } })) {
    return res.status(409).json({ success: false, error: 'Ce nom d\'utilisateur est deja pris' });
  }
  if (email && await User.findOne({ where: { email, id: { [require('sequelize').Op.ne]: user.id } } })) {
    return res.status(409).json({ success: false, error: 'Cet email est deja utilise' });
  }
  try {
    for (const field of ['name', 'username', 'email', 'avatar', 'location']) {
      if (field in data) {
        user[field] = field === 'avatar' ? (data[field] || '') : (data[field] || '').trim();
      }
    }
    if ('tags' in data) {
      user.tags = JSON.stringify(Array.isArray(data.tags) ? data.tags : []);
    }
    await user.save();
    res.json({ success: true, message: 'User updated', user: serialize(user) });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: `User ${req.params.id} deleted` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  const data = req.body || {};
  const username = (data.username || '').trim();
  const password = data.password || '';
  const user = await User.findOne({ where: { username } });
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }
  res.json({ success: true, user: serialize(user) });
};
