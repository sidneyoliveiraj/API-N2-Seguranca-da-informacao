// server.js
const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const helmet         = require('helmet');
const cookieParser   = require('cookie-parser');
const csurf          = require('csurf');

// Garante que a conexão é ativada
require('./config/db');

const userRoutes     = require('./routes/user_routes');

const app = express();

// 1) Segurança de headers
app.use(helmet());

// 2) Parser de cookies
app.use(cookieParser());

// 3) Rota pública para obter CSRF token
const csrfProtection = csurf({ cookie: true });
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// 4) Global error handler para CSRF
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token inválido' });
  }
  next(err);
});

// 5) Body parser para JSON e form-urlencode
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 6) method-override (para suportar DELETE/PUT via forms)
app.use(methodOverride('_method'));

// 7) Servir estáticos (ex.: public/csrf-attack.html)
app.use(express.static(path.join(__dirname, 'public')));

// 8) Montar rotas de usuário
app.use('/users', userRoutes);

// 9) Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
