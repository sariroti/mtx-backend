require('dotenv').config();

const { auth } = require('express-openid-connect');

const express = require('express');
const app = express();
const auth0 = require('./auth');
const mw = require('./middleware/response');
const userService = require('./services/user-service');

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(__dirname + '/public'));

app.use(auth(auth0.config));

app.use(mw.responseMiddleware);

app.set('view engine', 'pug');

app.post('/api/user/resend-email-verification', async (req, res) => {
  const { userId } = req.body;

  const createEmailVerification =
    await auth0.auth0ManagementClient.sendEmailVerification({
      user_id: userId,
    });

  console.log(createEmailVerification);
});

app.get('/', async (req, res) => {
  // if (req.oidc.isAuthenticated()) {
  //   // console.log(req.oidc.user);
  //   // console.log(req.oidc.user.email_verified);

  //   res.locals.payload.payload = req.oidc.user;

  //   return res.send(res.locals.payload);
  // }

  if (!req.oidc.isAuthenticated()) return res.redirect('/login');

  res.render('index', {
    title: 'dashboard',
    message: 'Hello there!',
    user: req.oidc.user,
  });
});

app.get('/profile', async (req, res) => {
  const {
    oidc: {
      user: { sub },
    },
    oidc: { user },
  } = req;

  const id = sub.split('|')[1];

  const nameDB = userService.getById(id);

  const payload = {
    name: user.name,
    email: user.email,
    emailVerified: user.email_verified,
  };
  if (nameDB) {
    payload.name = nameDB;
  }
  res.render('profile', {
    title: 'profile',
    user: payload,
  });
});

app.put('/api/user/profile', async (req, res) => {
  const { name } = req.body;
  const { sub } = req.oidc.user;

  const id = sub.split('|')[1];

  userService.create(id, name);
  return res.send({ success: true });
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
