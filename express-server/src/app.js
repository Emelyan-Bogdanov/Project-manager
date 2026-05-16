require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ensure directories exist
const dirs = [
  path.resolve(__dirname, '../uploads'),
  path.resolve(__dirname, '../images'),
];
dirs.forEach((d) => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// routes
app.use(require('./routes/userRoutes'));
app.use(require('./routes/taskRoutes'));
app.use(require('./routes/workspaceRoutes'));
app.use(require('./routes/messageRoutes'));
app.use(require('./routes/fileRoutes'));
app.use(require('./routes/imageRoutes'));

// error handler
app.use(errorHandler);

async function start() {
  try {
    await sequelize.sync({ force: process.env.NODE_ENV === 'test' });
    console.log(`Express server running on http://localhost:${PORT}`);
    app.listen(PORT);
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
}

start();
