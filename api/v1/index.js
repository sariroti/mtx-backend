const express = require('express');

const router = express.Router();

const profileRouter = require('./profile');
const userRouter = require('./user');

router.use('/profile', profileRouter);
router.use('/user', userRouter);

module.exports = router;
