// routes/user_routes.js
const express       = require('express');
const router        = express.Router();
const csrf          = require('csurf');
const ctrl          = require('../controllers/user_controller');
const auth          = require('../middleware/auth');

const csrfProtection = csrf({ cookie: true });

// Versão 2.0 — registro e login precisam de CSRF
router.post('/register', csrfProtection, ctrl.register);
router.post('/login',    csrfProtection, ctrl.login);

// CRUD Usuários (autenticado + CSRF onde muta dados)
router.get('/',            auth,                 ctrl.list);
router.put('/:id',         auth, csrfProtection, ctrl.update);
router.delete('/:id',      auth, csrfProtection, ctrl.remove);

module.exports = router;
