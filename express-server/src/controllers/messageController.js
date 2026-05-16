const { Message } = require('../models');

exports.byWorkspace = async (req, res) => {
  const messages = await Message.findAll({ where: { workspaceId: req.params.id } });
  res.json(messages.map(m => ({
    id: m.id,
    text: m.text,
    authorid: m.authorId,
    workspaceId: m.workspaceId,
  })));
};
