const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars', engine({ 
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

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
]

app.get('/', function(req, res) {

    res.render('index', {
        games
    });
});

app.get("/games/:id", function(req, res) {
    const game = games.find(game => game.id == req.params.id)
    res.render("ads", {
        game
    })
})

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});