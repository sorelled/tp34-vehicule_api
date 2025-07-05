const pool = require('../config/db');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    // Hasher un mot de passe test
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insérer un utilisateur test
    await pool.query(
      'INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)',
      ['Admin', 'admin@propelize.com', hashedPassword]
    );

    // Insérer des véhicules tests
    await pool.query(`
      INSERT IGNORE INTO vehicles 
        (registrationNumber, make, model, year, rentalPrice)
      VALUES 
        ('ABC123', 'Toyota', 'Camry', 2020, 50.00),
        ('XYZ789', 'Honda', 'Civic', 2021, 45.00)
    `);

    console.log('Données initiales ajoutées !');
  } catch (err) {
    console.error('Erreur lors du seeding :', err);
  }
};

module.exports = seedDatabase;