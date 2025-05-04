// models/user_model.js
const db = require('../config/db');

const User = {
  // Retorna todos os usuários
  findAll: () =>
    db.query('SELECT * FROM users')
      .then(([rows]) => rows),

  // Retorna um único usuário pelo ID
  findById: id =>
    db.query('SELECT * FROM users WHERE id = ?', [id])
      .then(([rows]) => rows[0]),

  // Cria um novo usuário
  create: ({ username, email, password }) =>
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    ).then(([result]) => result),

  // Atualiza um usuário existente
  update: (id, { username, email, password }) =>
    db.query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [username, email, password, id]
    ),

  // Remove um usuário pelo ID
  remove: id =>
    db.query('DELETE FROM users WHERE id = ?', [id])
};

module.exports = User;
