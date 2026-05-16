const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Workspace', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    iconPath: {
      type: DataTypes.STRING(300),
      defaultValue: '[NO IMAGE]',
    },
  }, {
    tableName: 'workspaces',
    timestamps: false,
  });
};
