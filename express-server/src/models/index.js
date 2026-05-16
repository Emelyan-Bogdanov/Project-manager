const sequelize = require('../config/database');
const UserModel = require('./User');
const WorkspaceModel = require('./Workspace');
const TaskModel = require('./Task');
const MessageModel = require('./Message');
const FileEntryModel = require('./FileEntry');

const User = UserModel(sequelize);
const Workspace = WorkspaceModel(sequelize);
const Task = TaskModel(sequelize);
const Message = MessageModel(sequelize);
const FileEntry = FileEntryModel(sequelize);

module.exports = {
  sequelize,
  User,
  Workspace,
  Task,
  Message,
  FileEntry,
};
