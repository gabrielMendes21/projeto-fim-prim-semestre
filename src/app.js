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

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});