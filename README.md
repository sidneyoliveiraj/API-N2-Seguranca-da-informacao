**Disciplina:** Segurança da Informação (5ª fase)  
**Professor:** Claudinei Dias  
**Alunos:**  
- Eder Zerek Duarte  
- Leonardo Henrique Fernandes Nascimento  
- José Lucas Andrade Fonseca  
- Sidney Cardoso de Oliveira Junior  

**Atividade N2:** Vulnerabilidades em Aplicações Web (Pentesting parte 1)  

---

## Tecnologias Utilizadas

- **Node.js** (v16+)  
- **Express** (framework HTTP)  
- **MongoDB Atlas** (banco de dados) via **Mongoose**  
- **Postman** (testes de API)  
- **bcrypt**, **jsonwebtoken**, **helmet**, **cookie-parser**, **csurf** (v2.0)  

---

# API Pentesting — Versão 1.0

### 1. Instalação das Dependências

1. Abra um terminal ou prompt de comando.  
2. Navegue até a pasta raiz do projeto (onde está o `package.json`).  
3. Execute **apenas um** dos comandos:

   ```bash
   npm install
   # ou
   yarn install

Isso baixará todas as dependências listadas em package.json.

 ### Como Rodar Localmente

 Garanta que a string de conexão com o MongoDB Atlas está em config/db.js

 No terminal, na pasta raiz, execute:

 npm start
# ou
node server.js

Se tudo ocorreu bem, verá:

✅ Conectado ao MongoDB Atlas
🚀 API rodando em http://localhost:3000


Acesse http://localhost:3000 para usar a API.

Para encerrar, pressione Ctrl + C.

---

# API Pentesting — Versão 2.0

Nesta versão adicionamos:

Registro e login de usuários com bcrypt e JWT;
Proteção das rotas GET, PUT e DELETE via token JWT (Authorization: Bearer <token>);
Helmet para segurança de cabeçalhos HTTP;
CSRF protection via csurf (formulários);
Middleware de autenticação em middleware/auth.js;

### Instalar Novas Dependências

npm install bcrypt jsonwebtoken helmet cookie-parser csurf

# ou

yarn add bcrypt jsonwebtoken helmet cookie-parser csurf


Sua API está agora com autenticação segura, proteção contra CSRF, cabeçalhos HTTP reforçados e criptografia de senhas.



## Como rodar os testes de API no Postman

1. Importe a Collection:
   - Vá em **Collections → Import → File** e selecione `postman/Segurança-N2-v2.0-JWT-Collection.json`.
2. Importe o Environment:
   - Vá em **Environments → Import → File** e selecione `postman/Segurança-N2-v2.0-JWT-Environment.json`.
3. Selecione aquele Environment no canto superior direito do Postman.
4. Clique em **Runner**, escolha a Collection “Segurança – N2 v2.0 – JWT” e execute.
