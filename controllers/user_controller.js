// controllers/user_controller.js
const User = require('../models/user_model');

exports.list = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Falha ao buscar usuários.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await User.create({ username, email, password });
    res.status(201).json({
      message: 'Usuário criado.',
      insertId: result.insertId
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Falha ao criar usuário.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    await User.update(id, { username, email, password });
    res.status(200).json({ message: 'Usuário atualizado.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Falha ao atualizar usuário.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await User.remove(id);
    res.status(200).json({ message: 'Usuário excluído.' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ error: 'Falha ao excluir usuário.' });
  }
};
