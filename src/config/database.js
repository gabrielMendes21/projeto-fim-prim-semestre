const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tbgl_gameplays', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;