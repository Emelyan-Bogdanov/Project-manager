const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    taskType: {
      type: DataTypes.STRING(50),
      defaultValue: 'basic',
    },
    tags: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    urls: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    images: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    files: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'todo',
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.STRING(30),
      defaultValue: '',
    },
    reminder: {
      type: DataTypes.STRING(30),
      defaultValue: '',
    },
  }, {
    tableName: 'task',
    timestamps: false,
  });
};
