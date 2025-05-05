const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const path           = require('path');
const userRoutes     = require('./routes/user_routes');

const app = express();

// Primeiro parse do form para req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  faz override do método lendo req.body._method
app.use(methodOverride('_method'));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Servir estáticos csrf-attack.html
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('✅ Conectado ao MongoDB Atlas');
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
