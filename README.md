**Disciplina:** Segurança da Informação (5ª fase)  
**Professor:** Claudinei Dias  
**Alunos:**  
**Atividade N2:** Vulnerabilidades em Aplicações Web (Pentesting parte 1)  

---

## 2. Tecnologias Utilizadas

- **Node.js** (v16+)  
- **Express** (rota e servidor HTTP)  
- **MongoDB Atlas** (banco de dados em nuvem) via **Mongoose**  
- **Postman** (para testar as rotas e ataques)  

---

# API Pentesting — Versão 1.0

## Instalação das Dependências

1. Abra um terminal ou prompt de comando.  
2. Navegue até a pasta raiz do projeto (onde está o `package.json`).  
3. Execute **um** dos comandos abaixo:


npm install

# ou, se preferir usar yarn:

yarn install


Isso irá baixar todas as dependências listadas em package.json


## Como Rodar a Aplicação Localmente

Certifique-se de que a string de conexão com o MongoDB Atlas está configurada em config/db.js.

No mesmo terminal, ainda na pasta raiz do projeto, execute um dos comandos:

npm start
# ou
node server.js

Se tudo estiver correto, você verá no console:

✅ Conectado ao MongoDB Atlas
🚀 API rodando em http://localhost:3000


A API agora está disponível em http://localhost:3000.
Para interromper o servidor, pressione Ctrl + C no terminal.