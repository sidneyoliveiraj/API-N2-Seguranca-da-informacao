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

## Versionamento do Projeto

Usamos Git: commits frequentes a cada recurso implementado.

Branch principal main.

Tagging das versões:

v1.0 → API sem proteção.

v2.0 → API com JWT, CSRF, Helmet, etc.

### Visão Geral das Versões

Versão 1.0
CRUD básico de usuários.

Sem nenhuma proteção adicional.

Código em v1.0/.

Versão 2.0
Adiciona:

Autenticação JWT.

Proteção CSRF via csurf.

Cabeçalhos reforçados com Helmet.

Senhas bcrypt.

Middleware de autenticação (middleware/auth.js).

Código em v2.0/.

---

# API Pentesting — Versão 2.0

Nesta versão adicionamos:

Registro e login de usuários com bcrypt (hash de senhas) e JWT

Proteção das rotas GET, PUT e DELETE via token JWT (Authorization: Bearer <token>)

Helmet para reforçar cabeçalhos HTTP

Proteção CSRF via csurf

Middleware de autenticação em middleware/auth.js


### Instalar Novas Dependências

npm install bcrypt jsonwebtoken helmet cookie-parser csurf
# ou
yarn add bcrypt jsonwebtoken helmet cookie-parser csurf



 # Executar

Idêntico ao V1.0:

npm start
# ou
node server.js


## Como rodar os testes de API no Postman

1. Importe a Collection:
   - Vá em **Collections → Import → File** e selecione `postman/Segurança-N2-v2.0-JWT-Collection.json`.
2. Importe o Environment:
   - Vá em **Environments → Import → File** e selecione `postman/Segurança-N2-v2.0-JWT-Environment.json`.
3. Selecione aquele Environment no canto superior direito do Postman.
4. Clique em **Runner**, escolha a Collection “Segurança – N2 v2.0 – JWT” e execute.



## Imagens / Prints

Toda a pasta images/ está organizada por cenário:

# Cenário CSRF

![Parte 1](images/Cenário%20CSRF/Cenário%20CSRF%20parte%201.PNG)


![Parte 2](images/Cenário%20CSRF/Cenário%20CSRF%20parte%202.PNG)

![Parte 3](images/Cenário%20CSRF/Cenário%20CSRF%20parte%203.PNG)


---

# Cross-Site Scripting (XSS)

![Parte 1](images/xss-scenario/Cross-Site%20Scripting%20parte%201.PNG)

![Parte 2](images/xss-scenario/Cross-Site%20Scripting%20parte%202.PNG)

![Parte 3](images/xss-scenario/Cross-Site%20Scripting%20parte%203.PNG)

![Parte 4](images/xss-scenario/Cross-Site%20Scripting%20parte%204.PNG)

---

# NoSQL Injection

![Parte 1](images/NoSQL%20Injection/NoSQL%20injection%20parte%201.PNG)

![Parte 2](images/NoSQL%20Injection/NoSQL%20injection%20parte%202.PNG)

---

# v2.0 / Login e obtenção do JWT

![ObterTokenCSRF](images/v2.0/Login%20e%20obtenção%20do%20JWT/05_ObterTokenCSRF_BodyCookie.PNG)

![Registro e Obtencao do Token Body](images/v2.0/Login%20e%20obtenção%20do%20JWT/06_RegistroEObtencaoToken_HeadersBody.PNG)

![Registro e Obtencao do Token Resposta](images/v2.0/Login%20e%20obtenção%20do%20JWT/07_RegistroEObtencaoToken_BodyResponse.PNG)

![Login com o Token header](images/v2.0/Login%20e%20obtenção%20do%20JWT/08_LoginComToken_HeadersBodyResponse.PNG)

![Login com o Token Resposta](images/v2.0/Login%20e%20obtenção%20do%20JWT/09_LoginComToken_BodyResponse.PNG)

---

# v2.0 / Registrar Usuário com CSRF token

![Parte 1](images/v2.0/Registrar%20Usuário%20com%20CSRF%20token/01_RegistrarUsuario_semTokenCSRF.PNG)

![Parte 2](images/v2.0/Registrar%20Usuário%20com%20CSRF%20token/02_ObterTokenCSRF.PNG)

![Parte 3](images/v2.0/Registrar%20Usuário%20com%20CSRF%20token/03_RegistrarUsuarioCSRF_Headers.PNG)

![Parte 4](images/v2.0/Registrar%20Usuário%20com%20CSRF%20token/04_RegistrarUsuarioCSRF_BodyResponse.PNG)