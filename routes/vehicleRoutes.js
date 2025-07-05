const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Vehicle API is working!');
});

module.exports = router;