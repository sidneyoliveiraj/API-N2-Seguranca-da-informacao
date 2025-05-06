const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Middleware de log para todas as requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_db'
};

console.log('Configuração do MySQL:', dbConfig);

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('ERRO na conexão MySQL:', err.message);
        console.error('Código do erro:', err.code);
        console.error('Erro completo:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Rota /setup pro banco 
app.get('/setup', (req, res) => {
    console.log('Iniciando setup do banco...');
    
    const queries = [
        'CREATE DATABASE IF NOT EXISTS login_db',
        'USE login_db',
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`,
        `INSERT IGNORE INTO users (username, password) VALUES ('admin', 'senha123')`
    ];

    executeSequentialQueries(queries)
        .then(() => {
            console.log('Setup completo com sucesso');
            res.send(' Banco configurado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro no setup:', error);
            res.status(500).send(' Erro no setup: ' + error.message);
        });
});

function executeSequentialQueries(queries) {
    return new Promise((resolve, reject) => {
        let index = 0;
        
        function next() {
            if (index >= queries.length) return resolve();
            
            const query = queries[index++];
            console.log(`Executando query ${index}/${queries.length}:`, query);
            
            db.query(query, (err) => {
                if (err) return reject(err);
                next();
            });
        }
        
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // CONSTRUÇÃO PERIGOSA - concatenando diretamente os valores (vulnerável a SQL Injection)
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log('Executando query vulnerável:', sql); 
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro na query:', err);
            return res.status(500).send('Erro no servidor');
        }
        
        if (results.length > 0) {
            res.send({ 
                success: true, 
                message: 'Login bem-sucedido!', 
                user: results[0],
                warning: 'Esta implementação é vulnerável a SQL Injection!' 
            });
        } else {
            res.status(401).send({ 
                success: false, 
                message: 'Credenciais inválidas' 
            });
        }
    });
});



// Rota raiz para teste básico
app.get('/', (req, res) => {
    res.send('Servidor está funcionando! Acesse /setup para configurar o banco.');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\nServidor rodando em http://localhost:${PORT}`);
    console.log('Endpoints disponíveis:');
    console.log(`- GET  /         → Teste básico`);
    console.log(`- GET  /setup    → Configurar banco de dados`);
    console.log(`- POST /login    → Login (vulnerável)`);
    console.log('\nPressione Ctrl+C para encerrar\n');
})