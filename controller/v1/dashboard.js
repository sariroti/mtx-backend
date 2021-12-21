const express = require('express');

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    title: 'dashboard',

    user: req.oidc.user,
  });
});

module.exports = router;
