// config/db.js
const mongoose = require('mongoose');

// Substitua pela sua URI do Atlas
const uri = 'mongodb+srv://sidneycardosojo:UaKfhfhkd8beVQiX@cluster0.o5ncvqh.mongodb.net/api-n2-seguranca?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB Atlas:', err);
    process.exit(1);
  });

module.exports = mongoose;
