require('dotenv').config();

const { auth } = require('express-openid-connect');
const dayJS = require('dayjs');

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

  return res.redirect('/dashboard');
});

app.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    title: 'dashboard',

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

  console.log(user);
  const nameDB = userService.getById(id);

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

app.put('/api/user/profile', async (req, res) => {
  const { name } = req.body;
  const { sub } = req.oidc.user;

  const id = sub.split('|')[1];

  userService.create(id, name);
  return res.send({ success: true });
});

app.get('/reset-password', async (req, res) => {
  const isReset = req.oidc.user.sub.indexOf('auth0') >= 0;

  res.render('reset-password', {
    title: 'reset password',
    user: req.oidc.user,
    isReset,
  });
});

app.post('/api/user/reset-password', async (req, res) => {
  const { sub } = req.body;

  const ticket = await auth0.auth0ManagementClient.createPasswordChangeTicket({
    user_id: sub,
  });

  return res.send(ticket);
});

app.get('/api/user', async (req, res) => {
  const users = await auth0.auth0ManagementClient.getUsers({
    page: 0,
    per_page: 10,
  });

  return res.send(users);
});

app.get('/api/user/statistic', async (req, res) => {
  const payload = {
    totalUser: 0,
    totalUserActiveToday: 0,
    totalUserActiveLast7Day: 0,
  };
  const todayDate = dayJS().format('YYYY-MM-DD');
  const last7Date = dayJS().add(-7).format('YYYY-MM-DD');

  const users = await auth0.auth0ManagementClient.getUsers();
  const usersActiveToday = await auth0.auth0ManagementClient.getUsers({
    q: `last_login:"${todayDate}"`,
  });

  const usersActiveLast7day = await auth0.auth0ManagementClient.getUsers({
    q: `last_login:[${last7Date} TO ${todayDate}]`,
  });

  payload.totalUser = users.length;
  payload.totalUserActiveToday = usersActiveToday.length;
  payload.totalUserActiveLast7Day = usersActiveLast7day.length;

  return res.send(payload);
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
