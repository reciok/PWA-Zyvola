const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = '2h';

function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      premium: user.premium
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = createUser({ email, password: hashedPassword });

  return res.status(201).json({
    message: 'Usuario registrado correctamente',
    user: {
      id: newUser.id,
      email: newUser.email,
      premium: newUser.premium
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  const passwordMatches = bcrypt.compareSync(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  const token = signToken(user);

  return res.json({
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      email: user.email,
      premium: user.premium
    }
  });
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = {
  register,
  login,
  validateToken,
  me
};
