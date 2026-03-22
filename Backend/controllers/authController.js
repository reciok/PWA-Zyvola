const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      premium: false
    });

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        email: newUser.email,
        premium: newUser.premium
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno en el registro' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

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
        id: user._id,
        email: user.email,
        premium: user.premium
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno en el login' });
  }
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        premium: user.premium
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error obteniendo el usuario' });
  }
}

module.exports = {
  register,
  login,
  validateToken,
  me
};
