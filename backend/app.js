const express = require('express');
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const errorHandler = require('./middlewares/errorHandler');
const initDatabase = require('./config/initDB'); // <-- AJOUTE CETTE LIGNE
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());

// Initialiser la base de données au démarrage
initDatabase()
  .then(() => console.log('Base de données initialisée'))
  .catch((err) => console.error('Erreur init DB:', err));

  // Ajoutez ce middleware 
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
     
    ]
  },
  apis: [__dirname + '/routes/*.js'], // <-- Utilise __dirname pour le chemin absolu
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ensuite seulement, tes routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use(errorHandler);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// export de l'app

module.exports = app; 