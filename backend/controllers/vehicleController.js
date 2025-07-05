const Vehicle = require('../models/Vehicle');

// Créer un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir tous les véhicules
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
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
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé' });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé' });
    res.json({ message: 'Véhicule supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rechercher des véhicules (par marque, modèle, année, etc.)
exports.searchVehicles = async (req, res) => {
  try {
    const query = {};
    if (req.query.marque) query.marque = req.query.marque;
    if (req.query.modele) query.modele = req.query.modele;
    if (req.query.annee) query.annee = req.query.annee;
    if (req.query.couleur) query.couleur = req.query.couleur;
    if (req.query.immatriculation) query.immatriculation = req.query.immatriculation;
    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
