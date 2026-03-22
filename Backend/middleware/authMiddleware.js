const { validateToken } = require('../controllers/authController');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = validateToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      premium: decoded.premium
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido o expirado' });
  }
}

module.exports = authMiddleware;
