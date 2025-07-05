const express = require('express');
const cors = require('cors');
const vehicleRoutes = require('./backend/routes/vehicleRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('./backend/config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});