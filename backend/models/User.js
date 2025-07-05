const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class User {
  /**
   * Crée un nouvel utilisateur avec mot de passe hashé
   * @param {Object} userData - Données utilisateur
   * @returns {Number} ID de l'utilisateur créé
   */
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  }

  /**
   * Trouve un utilisateur par email
   * @param {String} email 
   * @returns {Object|null} Utilisateur ou null
   */
  static async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0];
  }

  /**
   * Génère un token JWT
   * @param {Object} user - Objet utilisateur
   * @returns {String} Token JWT
   */
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  /**
   * Vérifie un token JWT
   * @param {String} token 
   * @returns {Object} Payload décodé
   * @throws {Error} Si token invalide
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

// const User = require('../models/User');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = User.verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = User;