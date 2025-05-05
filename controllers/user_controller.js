// controllers/user_controller.js
const User = require('../models/user_model');

exports.list = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Falha ao buscar usuários.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json({
      message: 'Usuário criado.',
      id: newUser._id
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Falha ao criar usuário.' });
  }
};

// Rota de login VULNERÁVEL (usa o driver nativo para não fazer casting)
exports.login = async (req, res) => {
  try {
    // O filter é exatamente o JSON enviado pelo cliente, sem alterações
    const filter = req.body;

    // findOne direto na coleção subjacente (sem Mongoose casting)
    const user = await User.collection.findOne(filter);

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err) {
    console.error('Erro no login (vulnerável):', err);
    res.status(500).json({ error: 'Falha no login.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    await User.findByIdAndUpdate(id, { username, email, password });
    res.status(200).json({ message: 'Usuário atualizado.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Falha ao atualizar usuário.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuário excluído.' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ error: 'Falha ao excluir usuário.' });
  }
};
