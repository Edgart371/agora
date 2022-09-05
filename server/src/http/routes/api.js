const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    return res.send('API route');
  });

  return router;
};
