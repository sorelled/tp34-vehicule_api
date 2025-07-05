const pool = require('../config/db');

const User = {
  create: async (data) => {
    const [result] = await pool.query(
      'INSERT INTO users (nom, prenom, email, telephone, adresse) VALUES (?, ?, ?, ?, ?)',
      [data.nom, data.prenom, data.email, data.telephone, data.adresse]
    );
    return { id: result.insertId, ...data };
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, data) => {
    await pool.query(
      'UPDATE users SET nom=?, prenom=?, email=?, telephone=?, adresse=? WHERE id=?',
      [data.nom, data.prenom, data.email, data.telephone, data.adresse, id]
    );
    return User.findById(id);
  },
  delete: async (id) => {
    await pool.query('DELETE FROM users WHERE id=?', [id]);
  },
  search: async (queryObj) => {
    let sql = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    if (queryObj.nom) { sql += ' AND nom=?'; params.push(queryObj.nom); }
    if (queryObj.prenom) { sql += ' AND prenom=?'; params.push(queryObj.prenom); }
    if (queryObj.email) { sql += ' AND email=?'; params.push(queryObj.email); }
    if (queryObj.telephone) { sql += ' AND telephone=?'; params.push(queryObj.telephone); }
    const [rows] = await pool.query(sql, params);
    return rows;
  }
};

module.exports = User;