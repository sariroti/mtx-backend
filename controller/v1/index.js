const express = require('express');

const router = express.Router();
const dashboardRouter = require('./dashboard');
const profileRouter = require('./profile');
const resetPasswordRouter = require('./reset-password');

router.get('/', async (req, res) => {
  if (!req.oidc.isAuthenticated()) return res.redirect('/login');

  return res.redirect('/dashboard');
});

router.get('/callback', async (req, res) => {});

router.use(dashboardRouter);
router.use(profileRouter);
router.use(resetPasswordRouter);

module.exports = router;
