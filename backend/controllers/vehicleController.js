const Vehicle = require('../models/Vehicle');

// Créer un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les véhicules
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un véhicule par ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un véhicule
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.update(req.params.id, req.body);
    if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé' });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.delete(req.params.id);
    res.json({ message: 'Véhicule supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rechercher des véhicules (par marque, modèle, année, etc.)
exports.searchVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.search(req.query);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
