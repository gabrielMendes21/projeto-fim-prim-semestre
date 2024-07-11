const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/database');
const { Jogo, Anuncio } = require('./models/associations');



const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



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

app.get('/create', function(req, res){
  res.render("create")
})

const createAnuncio = async (req, res) => {
  const anuncioData = {
    id: req.body.id,
    data: req.body.data,
    horario: req.body.horario,
    plataforma: req.body.plataforma,
    contato: req.body.contato,
    detalhes: req.body.detalhes,
  };

  try {
    await Anuncio.create(anuncioData);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error creating ad' });
  }
};
app.post("/createAnuncio", createAnuncio);

//atualiza

const updateAnuncio = async (req, res) => {
  const id = req.params.id;
  const { jogo, data, horario, plataforma, contato, detalhes } = req.body;
  try {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    await Anuncio.update({ jogo, data, horario, plataforma, contato, detalhes }, { where: { id } });
    res.redirect('/anuncios');
  } catch (err) {
    console.error('Erro ao atualizar o anúncio:', err);
    res.status(500).json({ message: 'Erro ao atualizar o anúncio' });
  }
};

app.post("/updateAnuncio", updateAnuncio);

app.get("/editar/:id", async (req, res) => {
  try {
    const anuncioId = Number(req.params.id); 

    const anuncio = await Anuncio.findByPk(anuncioId);

    if (!anuncio) {
      return res.status(404).render('error', { message: 'Anúncio não encontrado' }); 
    }

    res.render("edit", { anuncio }); 
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao buscar anúncio' });
  }
});

const deleteAnuncio = async (req, res) => {
  const id = req.params.id;
  try {
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    await Anuncio.destroy({ where: { id } });
    res.redirect('/anuncios');
  } catch (err) {
    console.error('Erro ao excluir o anúncio:', err);
    res.status(500).json({ message: 'Erro ao excluir o anúncio' });
  }
};

app.get("/deletar", deleteAnuncio);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => console.log(err));