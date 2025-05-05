const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const helmet         = require('helmet');
const cookieParser   = require('cookie-parser');
const csurf          = require('csurf');

const userRoutes     = require('./routes/user_routes');

const app = express();

// Segurança de headers
app.use(helmet());

// Parser de cookies e CSRF token em cookie
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token inválido' });
  }
  next(err);
});

// Form data / JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// (Opcional) method-override, se ainda quiser demonstrar CSRF com DELETE via form
app.use(methodOverride('_method'));

// Servir demos estáticos (como csrf-attack.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('✅ Conectado ao MongoDB Atlas');
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
