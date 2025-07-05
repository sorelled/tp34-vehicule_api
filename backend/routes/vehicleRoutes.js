const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middlewares/auth');
const { validateVehicle } = require('../middlewares/validation');

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Gestion des véhicules
 */

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Créer un véhicule
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registrationNumber:
 *                 type: string
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               rentalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Véhicule créé
 *       400:
 *         description: Erreur de validation
 */
router.post('/', authenticate, validateVehicle, vehicleController.createVehicle);

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Récupérer tous les véhicules
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Liste des véhicules
 */
router.get('/', authenticate, vehicleController.getAllVehicles);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Récupérer un véhicule par ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Véhicule trouvé
 *       404:
 *         description: Véhicule non trouvé
 */
router.get('/:id', authenticate, vehicleController.getVehicleById);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Mettre à jour un véhicule
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Véhicule mis à jour
 *       404:
 *         description: Véhicule non trouvé
 */
router.put('/:id', authenticate, vehicleController.updateVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Supprimer un véhicule
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Véhicule supprimé
 *       404:
 *         description: Véhicule non trouvé
 */
router.delete('/:id', authenticate, vehicleController.deleteVehicle);

/**
 * @swagger
 * /api/vehicles/search/registration/{registration}:
 *   get:
 *     summary: Rechercher un véhicule par immatriculation
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: registration
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Véhicule trouvé
 *       404:
 *         description: Véhicule non trouvé
 */
router.get('/search/registration/:registration', vehicleController.findByRegistration);

/**
 * @swagger
 * /api/vehicles/search:
 *   get:
 *     summary: Rechercher des véhicules (critères multiples)
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 */
router.get('/search', vehicleController.searchVehicles);

module.exports = router;