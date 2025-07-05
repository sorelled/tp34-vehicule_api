const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * Inscription d'un nouvel utilisateur
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérification de l'existence de l'email
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email already exists' 
      });
    }

    // Création de l'utilisateur
    const userId = await User.create({ name, email, password });
    
    // Réponse sans le mot de passe
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: userId, name, email }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

/**
 * Connexion utilisateur
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    // Vérification utilisateur + mot de passe
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Génération du token
    const token = User.generateToken(user);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};