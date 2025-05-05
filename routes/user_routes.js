const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/user_controller');
const auth    = require('../middleware/auth');

// Parte 3.0 — Autenticação e autorização via JWT
router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);

// CRUD de Usuários
router.get('/',    auth, ctrl.list);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
