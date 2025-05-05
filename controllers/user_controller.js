const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const JWT_SECRET = 'seuSegredoSuperSecreto'; // em produção use VAR de ambiente

// GET /users  (listar todos — requer autenticação)
exports.list = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ error: 'Falha ao buscar usuários.' });
  }
};

// POST /users/register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hash });
    res.status(201).json({ message: 'Usuário registrado.', id: newUser._id });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ error: 'Falha ao registrar usuário.' });
  }
};

// POST /users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Falha no login.' });
  }
};

// PUT /users/:id  (requere auth)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const updateData = { username, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    await User.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: 'Usuário atualizado.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ error: 'Falha ao atualizar usuário.' });
  }
};

// DELETE /users/:id  (requere auth)
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
