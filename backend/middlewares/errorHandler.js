module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Erreurs de validation Joi
  if (err.isJoi) {
    return res.status(400).json({
      type: 'VALIDATION_ERROR',
      details: err.details
    });
  }

  // Erreurs MySQL
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      type: 'DUPLICATE_ENTRY',
      message: 'La ressource existe déjà'
    });
  }

  // Erreur 404 custom
  if (err.status === 404) {
    return res.status(404).json({
      type: 'NOT_FOUND',
      message: err.message || 'Ressource non trouvée'
    });
  }

  // Par défaut : erreur 500
  res.status(500).json({
    type: 'INTERNAL_ERROR',
    message: 'Une erreur inattendue est survenue'
  });
};