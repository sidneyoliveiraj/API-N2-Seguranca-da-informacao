// routes/user_routes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/user_controller');

// GET    
router.get('/', ctrl.list);

// POST  
router.post('/', ctrl.create);

// POST    vulneravel para NoSQL Injection
router.post('/login', ctrl.login);

// PUT    
router.put('/:id', ctrl.update);

// DELETE
router.delete('/:id', ctrl.remove);

module.exports = router;
