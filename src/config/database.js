const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tbgl_gameplays', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;