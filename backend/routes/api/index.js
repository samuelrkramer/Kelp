const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./businesses');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.use('/business', businessRouter);

module.exports = router;