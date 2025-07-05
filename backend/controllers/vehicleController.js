const Vehicle = require('../models/Vehicle');

module.exports = {
  // CREATE
   async createVehicle(req, res) {
    try {
      const id = await Vehicle.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // READ (all)
  async getAllVehicles(req, res) {
    try {
      const vehicles = await Vehicle.findAll();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // READ (by id)
  async getVehicleById(req, res) {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Véhicule non trouvé' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // UPDATE
  async updateVehicle(req, res) {
    try {
      await Vehicle.update(req.params.id, req.body);
      const updatedVehicle = await Vehicle.findById(req.params.id);
      res.json(updatedVehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE
  async deleteVehicle(req, res) {
    try {
      await Vehicle.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // METHODES DE RECHERCHE
  
  async findByRegistration(req, res) {
    res.json({ message: 'Recherche par immatriculation non implémentée.' });
  },

  async searchVehicles(req, res) {
    res.json({ message: 'Recherche de véhicules non implémentée.' });
  }
};