const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbPath = path.resolve(__dirname, '../../', process.env.DATABASE_PATH || './database/data.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
