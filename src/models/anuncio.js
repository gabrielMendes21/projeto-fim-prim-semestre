const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Jogo = require('./jogo');

const Anuncio = sequelize.define('Anuncio', {
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horario: {
    type: DataTypes.TIME,
    allowNull: false
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalhes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Anuncio;