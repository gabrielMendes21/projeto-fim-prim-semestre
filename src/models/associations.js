const Anuncio = require('./anuncio');
const Jogo = require('./jogo');

// Definindo as associações
Anuncio.belongsTo(Jogo);
Jogo.hasMany(Anuncio);

module.exports = { Anuncio, Jogo };