const express = require('express');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middlewares/errorHandler');
const initDatabase = require('./config/initDB');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Optionnel mais utile pour Swagger en local

// Initialiser la base de données
initDatabase()
  .then(() => console.log('✅ Base de données initialisée'))
  .catch((err) => console.error('❌ Erreur init DB:', err));

// Logger simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Véhicules',
      version: '1.0.0',
      description: 'Documentation de l\'API Véhicules et Utilisateurs'
    },
    servers: [
      {
        url: 'http://localhost:3000', // ← mis à jour pour Swagger UI
        description: 'Serveur local'
      }
    ]
  },
  apis: [__dirname + '/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use(errorHandler);

// Gestion des erreurs génériques
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
});

// Export de l'app pour les tests
module.exports = app;
