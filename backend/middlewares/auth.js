module.exports = (req, res, next) => {
  // Middleware d'authentification fictif pour déboguer
  req.user = { id: 1, name: 'Test User' };
  next();
};