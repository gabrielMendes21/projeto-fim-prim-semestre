const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/anuncioController');

// Rota para listar todos os anúncios e renderizar a página inicial de anúncios
router.get('/anuncios', anuncioController.getAllAnuncios);

// Rotas para criar um novo anúncio
router.get('/anuncios/create', anuncioController.createAnuncioForm);
router.post('/anuncios/create', anuncioController.createAnuncio);

// Rotas para editar e atualizar um anúncio existente
router.get('/anuncios/edit/:id', anuncioController.editAnuncioForm);
router.post('/anuncios/edit/:id', anuncioController.updateAnuncio);

// Rota para excluir um anúncio
router.post('/anuncios/delete/:id', anuncioController.deleteAnuncio);

module.exports = router;