// routes/user_routes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/user_controller');

// GET   /Lista todos os usuários
router.get('/', ctrl.list);

// POST  /Cria um novo usuário
router.post('/', ctrl.create);

// PUT   /Atualiza um usuário existente
router.put('/:id', ctrl.update);

// DELETE /Remove um usuário
router.delete('/:id', ctrl.remove);

module.exports = router;
