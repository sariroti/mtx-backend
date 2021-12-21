const express = require('express');
const router = express.Router();
const userService = require('../../services/user-service');

router.get('/profile', async (req, res) => {
  const {
    oidc: {
      user: { sub },
    },
    oidc: { user },
  } = req;

  const id = sub.split('|')[1];

  console.log(id);

  const nameDB = userService.getById(id);
  console.log(nameDB);
  const payload = {
    name: user.name,
    email: user.email,
    email_verified: user.email_verified,
  };
  if (nameDB) {
    payload.name = nameDB;
  }
  res.render('profile', {
    title: 'profile',
    user: payload,
  });
});

module.exports = router;
