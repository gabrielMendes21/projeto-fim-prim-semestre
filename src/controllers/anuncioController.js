const { Anuncio } = require('../models/associations');

// Método para listar todos os anúncios
exports.getAllAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.findAll();
    res.json(anuncios);
  } catch (err) {
    console.error('Erro ao listar os anúncios:', err);
    res.status(500).json({ message: 'Erro ao listar os anúncios' });
  }
};

// Método para criar um novo anúncio
exports.createAnuncio = async (req, res) => {
  const { JogoId, data, horario, plataforma, contato, detalhes } = req.body;
  try {
    // Validação básica dos dados
    if (!JogoId || !data || !horario || !plataforma || !contato) {
      return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }
    await Anuncio.create({ JogoId, data, horario, plataforma, contato, detalhes });
    res.redirect('/anuncios');
  } catch (err) {
    console.error('Erro ao criar o anúncio:', err);
    res.status(500).json({ message: 'Erro ao criar o anúncio' });
  }
};

// Método para atualizar um anúncio existente
exports.updateAnuncio = async (req, res) => {
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

// Método para excluir um anúncio existente
exports.deleteAnuncio = async (req, res) => {
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