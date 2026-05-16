const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    tags: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
    location: {
      type: DataTypes.STRING(120),
      defaultValue: '',
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });
};
