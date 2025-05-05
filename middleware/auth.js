const jwt = require('jsonwebtoken');
const secret = 'seuSegredoSuperSecreto'; // guarde em env var em produção

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, secret);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
