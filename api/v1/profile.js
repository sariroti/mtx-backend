const express = require('express');
const router = express.Router();
const auth0 = require('../../auth');

const userService = require('../../services/user-service');

router.put('/', async (req, res) => {
  const { name } = req.body;
  const { sub } = req.oidc.user;

  const id = sub.split('|')[1];

  userService.create(id, name);
  res.locals.payload.payload = { success: true };
  return res.send(res.locals.payload);
});

router.post('/reset-password', async (req, res) => {
  const { sub } = req.body;

  const ticket = await auth0.auth0ManagementClient.createPasswordChangeTicket({
    user_id: sub,
  });

  res.locals.payload.payload = ticket;

  return res.send(res.locals.payload);
});
module.exports = router;
