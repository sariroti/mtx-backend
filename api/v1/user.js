const express = require('express');
const router = express.Router();
const auth0 = require('../../auth');
const dayJS = require('dayjs');

router.get('/', async (req, res) => {
  let { skip, take } = req.query;

  skip = skip || 0;
  take = take || 10;
  const users = await auth0.auth0ManagementClient.getUsers({
    page: skip,
    per_page: take,
  });
  res.locals.payload.payload = users;

  return res.send(res.locals.payload);
});

router.post('/resend-email-verification', async (req, res) => {
  const { userId } = req.body;

  const createEmailVerification =
    await auth0.auth0ManagementClient.sendEmailVerification({
      user_id: userId,
    });

  res.locals.payload.payload = { success: true };
  res.send(res.locals.payload);
});

router.get('/statistic', async (req, res) => {
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

  res.locals.payload.payload = payload;
  return res.send(res.locals.payload);
});

module.exports = router;
