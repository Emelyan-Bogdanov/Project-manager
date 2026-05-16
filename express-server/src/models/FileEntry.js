const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('FileEntry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    original_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mime_type: {
      type: DataTypes.STRING(100),
      defaultValue: '',
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.STRING(70),
      defaultValue: '',
    },
  }, {
    tableName: 'files',
    timestamps: false,
  });
};
