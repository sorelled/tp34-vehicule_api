const pool = require('../config/db');

// Fonctions utilitaires pour les requêtes SQL sur la table vehicles
const Vehicle = {
  create: async (data) => {
    const [result] = await pool.query(
      'INSERT INTO vehicles (marque, modele, annee, couleur, immatriculation, proprietaire) VALUES (?, ?, ?, ?, ?, ?)',
      [data.marque, data.modele, data.annee, data.couleur, data.immatriculation, data.proprietaire]
    );
    return { id: result.insertId, ...data };
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM vehicles');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, data) => {
    await pool.query(
      'UPDATE vehicles SET marque=?, modele=?, annee=?, couleur=?, immatriculation=?, proprietaire=? WHERE id=?',
      [data.marque, data.modele, data.annee, data.couleur, data.immatriculation, data.proprietaire, id]
    );
    return Vehicle.findById(id);
  },
  delete: async (id) => {
    await pool.query('DELETE FROM vehicles WHERE id=?', [id]);
  },
  search: async (queryObj) => {
    let sql = 'SELECT * FROM vehicles WHERE 1=1';
    const params = [];
    if (queryObj.marque) { sql += ' AND marque=?'; params.push(queryObj.marque); }
    if (queryObj.modele) { sql += ' AND modele=?'; params.push(queryObj.modele); }
    if (queryObj.annee) { sql += ' AND annee=?'; params.push(queryObj.annee); }
    if (queryObj.couleur) { sql += ' AND couleur=?'; params.push(queryObj.couleur); }
    if (queryObj.immatriculation) { sql += ' AND immatriculation=?'; params.push(queryObj.immatriculation); }
    const [rows] = await pool.query(sql, params);
    return rows;
  }
};

module.exports = Vehicle;