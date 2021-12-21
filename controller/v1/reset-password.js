const express = require('express');

const router = express.Router();

router.get('/reset-password', async (req, res) => {
  const isReset = req.oidc.user.sub.indexOf('auth0') >= 0;

  res.render('reset-password', {
    title: 'reset password',
    user: req.oidc.user,
    isReset,
  });
});

module.exports = router;
