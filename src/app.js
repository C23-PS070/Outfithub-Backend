const express = require('express');
const { Sequelize } = require('sequelize');
const routes = require('./routes');

const app = express();

// Configuration for Cloud SQL
const config = {
  user: 'root', // Ganti dengan username Cloud SQL MySQL Anda
  password: 'Outfithub@CS23!', // Ganti dengan password Cloud SQL MySQL Anda
  database: 'outfithub-db', // Ganti dengan nama database Cloud SQL MySQL Anda
  socketPath: 'project-capstone-386905:asia-southeast2:outfithub-db', // Ganti dengan Connection Name Cloud SQL MySQL Anda
};

// Create connection to Cloud SQL
const sequelize = new Sequelize(config.database, config.user, config.password, {
  dialect: 'mysql',
  dialectOptions: {
    socketPath: config.socketPath
  },
  logging: false
});

// Import models
const User = require('./models/user')(sequelize);

// Define associations (if any)
// User.hasMany(...);

// Parse JSON request body
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// Sync database and start server
sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
