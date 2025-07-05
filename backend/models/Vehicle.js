const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  annee: { type: Number, required: true },
  couleur: { type: String },
  immatriculation: { type: String, required: true, unique: true },
  proprietaire: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);