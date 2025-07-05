const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'propelize_db',
};

async function initDatabase() {
  // Connexion sans base pour créer la base si besoin
  const connection = await mysql.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${connectionConfig.database}\``);
  await connection.end();

  // Connexion à la bonne base
  const db = await mysql.createConnection(connectionConfig);

  // Création de la table users si elle n'existe pas
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);

  // Création de la table vehicles si elle n'existe pas
  await db.execute(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      registrationNumber VARCHAR(20) UNIQUE NOT NULL,
      make VARCHAR(50) NOT NULL,
      model VARCHAR(50) NOT NULL,
      year INT NOT NULL,
      rentalPrice DECIMAL(10,2) NOT NULL
    )
  `);

  await db.end();
}

module.exports = initDatabase;