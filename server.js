// server.js
const express    = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');

const app = express();


app.use(bodyParser.json());


app.use('/users', userRoutes);

// Porta servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
