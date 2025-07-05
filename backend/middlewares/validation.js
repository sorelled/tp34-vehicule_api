const Joi = require('joi');

// Schéma de validation pour les véhicules
const vehicleSchema = Joi.object({
  registrationNumber: Joi.string().pattern(/^[A-Z0-9]{2,10}$/).required(),
  make: Joi.string().min(2).max(50).required(),
  model: Joi.string().min(1).max(50).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  rentalPrice: Joi.number().positive().precision(2).required()
});

// Middleware de validation
module.exports = {
  validateVehicle: (req, res, next) => {
    const { error } = vehicleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.details.map(d => d.message) 
      });
    }
    next();
  }
};