const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const anuncioRoutes = require('./routes/anuncioRoutes');
const { Jogo, Anuncio } = require('./models/associations');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(anuncioRoutes);

app.get('/', async (req, res) => {
  const response = await Jogo.findAll();
  const games = JSON.parse(JSON.stringify(response, null, 2));

  res.render('index', { games });
});

app.get('/games/:id', async (req, res) => {
  const gameResponse = await Jogo.findByPk(Number(req.params.id));
  const game = JSON.parse(JSON.stringify(gameResponse, null, 2));

  const adsResponse = await Anuncio.findAll({
    where: {
      JogoId: Number(req.params.id)
    }
  })
  let ads = JSON.parse(JSON.stringify(adsResponse, null, 2))
  ads = ads.map(ad => {
    const data = new Date(ad.data)
    return {
      ...ad,
      data: `${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`,
    }
  })

  res.render('ads', { game, ads });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => console.log(err));