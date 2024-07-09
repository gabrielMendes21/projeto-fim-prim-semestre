const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const anuncioRoutes = require('./routes/anuncioRoutes');
const { Jogo } = require('./models/associations');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(anuncioRoutes);
const games = [
  {
    name: "HAHS"
    
  }
]

app.get('/', async (req, res) => {
  const response = await Jogo.findAll();
  const games = JSON.parse(JSON.stringify(response, null, 2));

  console.log(games)

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