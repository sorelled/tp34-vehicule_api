const pool = require('../config/db');

class Vehicle {
  /**
   * CRUD complet + méthodes de recherche
   */
  
  // CREATE
  static async create(vehicleData) {
    const { registrationNumber, make, model, year, rentalPrice } = vehicleData;
    const [result] = await pool.query(
      `INSERT INTO vehicles 
       (registrationNumber, make, model, year, rentalPrice) 
       VALUES (?, ?, ?, ?, ?)`,
      [registrationNumber, make, model, year, rentalPrice]
    );
    return result.insertId;
  }

  // READ (all)
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM vehicles');
    return rows;
  }

  // READ (by id)
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    return rows[0];
  }

  // UPDATE
  static async update(id, vehicleData) {
    const { make, model, year, rentalPrice } = vehicleData;
    await pool.query(
      `UPDATE vehicles 
       SET make = ?, model = ?, year = ?, rentalPrice = ? 
       WHERE id = ?`,
      [make, model, year, rentalPrice, id]
    );
    return this.findById(id); // Retourne le véhicule mis à jour
  }

  // DELETE
  static async delete(id) {
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    return true;
  }

  // METHODES DE RECHERCHE
  
  // Par numéro d'immatriculation
  static async findByRegistration(registrationNumber) {
    const [rows] = await pool.query(
      'SELECT * FROM vehicles WHERE registrationNumber = ?', 
      [registrationNumber]
    );
    return rows[0];
  }

  // Par marque (make)
  static async findByMake(make) {
    const [rows] = await pool.query(
      'SELECT * FROM vehicles WHERE make LIKE ?',
      [`%${make}%`]
    );
    return rows;
  }

  // Par prix maximum
  static async findByMaxPrice(maxPrice) {
    const [rows] = await pool.query(
      'SELECT * FROM vehicles WHERE rentalPrice <= ?',
      [maxPrice]
    );
    return rows;
  }

  // Combinaison de critères
  static async search({ make, maxPrice, year }) {
    let query = 'SELECT * FROM vehicles WHERE 1=1';
    const params = [];

    if (make) {
      query += ' AND make LIKE ?';
      params.push(`%${make}%`);
    }

    if (maxPrice) {
      query += ' AND rentalPrice <= ?';
      params.push(maxPrice);
    }

    if (year) {
      query += ' AND year = ?';
      params.push(year);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }
}

module.exports = Vehicle;