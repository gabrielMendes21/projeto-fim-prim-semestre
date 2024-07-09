const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Anuncio = require('./anuncio');

const Jogo = sequelize.define('Jogo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  URLImagem: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Jogo;