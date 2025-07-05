const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

/**
 * @swagger
 * tags:
 *   name: Véhicules
 *   description: Gestion des véhicules
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Créer un véhicule
 *     tags: [Véhicules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Véhicule créé
 *       400:
 *         description: Erreur de validation
 *   get:
 *     summary: Obtenir tous les véhicules
 *     tags: [Véhicules]
 *     responses:
 *       200:
 *         description: Liste des véhicules
 */
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);

/**
 * @swagger
 * /vehicles/search:
 *   get:
 *     summary: Rechercher des véhicules
 *     tags: [Véhicules]
 *     parameters:
 *       - in: query
 *         name: marque
 *         schema:
 *           type: string
 *       - in: query
 *         name: modele
 *         schema:
 *           type: string
 *       - in: query
 *         name: annee
 *         schema:
 *           type: integer
 *       - in: query
 *         name: couleur
 *         schema:
 *           type: string
 *       - in: query
 *         name: immatriculation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 */
router.get('/search', vehicleController.searchVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Obtenir un véhicule par ID
 *     tags: [Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Véhicule trouvé
 *       404:
 *         description: Véhicule non trouvé
 *   put:
 *     summary: Mettre à jour un véhicule
 *     tags: [Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Véhicule mis à jour
 *       404:
 *         description: Véhicule non trouvé
 *   delete:
 *     summary: Supprimer un véhicule
 *     tags: [Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Véhicule supprimé
 *       404:
 *         description: Véhicule non trouvé
 */
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - marque
 *         - modele
 *         - annee
 *         - immatriculation
 *       properties:
 *         marque:
 *           type: string
 *         modele:
 *           type: string
 *         annee:
 *           type: integer
 *         couleur:
 *           type: string
 *         immatriculation:
 *           type: string
 *         proprietaire:
 *           type: string
 */

module.exports = router;
