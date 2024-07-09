const Anuncio = require('./anuncio');
const Jogo = require('./jogo');

// Definindo as associações
Anuncio.hasOne(Jogo);
Jogo.belongsTo(Anuncio);

module.exports = { Anuncio, Jogo };