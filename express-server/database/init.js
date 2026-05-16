const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { sequelize, User, Workspace, Task } = require('../src/models');

async function init() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database created and synced.');

    // seed users
    const users = [];
    for (let i = 0; i < 8; i++) {
      const u = await User.create({
        username: `user_${i}`,
        email: `user${i}@example.com`,
        password: '1234',
      });
      users.push(u);
    }
    console.log(`Seeded ${users.length} users`);

    // seed workspaces
    const wsNames = ['Projet 1', 'Projet 2', 'Projet 3'];
    for (const name of wsNames) {
      await Workspace.create({ name, description: `Description du ${name}` });
    }
    console.log(`Seeded ${wsNames.length} workspaces`);

    // seed tasks
    const titles = [
      'Design system', 'API Auth', 'Tests unitaires', 'Page parametres',
      'Tableau de bord', 'Base de donnees', 'Notification email',
      'Maquettes mobile', 'CI/CD Pipeline', 'Page connexion',
    ];
    const tagPool = ['Frontend', 'Backend', 'Design', 'DevOps', 'Mobile', 'UI', 'BDD', 'Auth'];
    const statuses = ['todo', 'in_progress', 'done'];
    const descriptions = [
      'Mettre en place le systeme de design pour l\'application',
      'Implementer l\'authentification via JWT',
      'Ecrire les tests unitaires pour les modules principaux',
      'Creer la page de parametres utilisateur',
      'Developper le tableau de bord avec les statistiques',
      'Concevoir le schema de la base de donnees',
      'Configurer les notifications par email',
      'Realiser les maquettes pour la version mobile',
      'Mettre en place le pipeline CI/CD',
      'Developper la page de connexion et d\'inscription',
    ];

    for (let i = 0; i < titles.length; i++) {
      await Task.create({
        title: titles[i],
        tags: JSON.stringify([tagPool[i % tagPool.length]]),
        description: descriptions[i],
        deadline: `${Math.floor(Math.random() * 28) + 1} Mai`,
        authorId: users[i % users.length].id,
        images: '[]',
        priority: (i % 3) + 1,
        status: statuses[i % 3],
        created_at: new Date().toISOString(),
        reminder: '',
      });
    }
    console.log(`Seeded ${titles.length} tasks`);
  } catch (e) {
    console.error('Seed error:', e);
  } finally {
    await sequelize.close();
  }
}

init();
