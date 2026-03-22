const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://rrecioblas_db_user:Noppro279@cluster0.fvoipwk.mongodb.net/backend?appName=Cluster0';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API de autenticacion activa',
    endpoints: ['POST /auth/register', 'POST /auth/login', 'GET /me']
  });
});

app.use('/', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();
