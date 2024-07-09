const Jogo = require('./models/jogo');

// Lista padrão dos jogos
const games = [
    {
      id: 0,
      name: "GTA V",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg"
    },
    {
      id: 1,
      name: "FIFA",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/143106037_IGDB-285x380.jpg"
    },
    {
      id: 2,
      name: "Minecraft",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg"
    },
    {
      id: 3,
      name: "CS GO",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/32399-285x380.jpg"
    },
    {
      id: 4,
      name: "Fortnite",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg"
    },
    {
      id: 5,
      name: "Valorant",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg"
    },
    {
      id: 6,
      name: "COD",
      imageURL: "https://static-cdn.jtvnw.net/ttv-boxart/512710-285x380.jpg"
    }
];

const promises = games.map(game => Jogo.create({nome: game.name, URLImagem: game.imageURL}))
const responses = Promise.all(promises);

