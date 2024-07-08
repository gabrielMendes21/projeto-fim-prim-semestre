const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const anuncioRoutes = require('./routes/anuncioRoutes');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(anuncioRoutes);

// Dados fictícios
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

app.get('/', (req, res) => {
  res.render('index', { games });
});

app.get('/games/:id', (req, res) => {
  const game = games.find(game => game.id == req.params.id);
  res.render('ads', { game });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => console.log(err));