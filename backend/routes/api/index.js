const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./business');
const reviewsRouter = require('./reviews')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.use('/business', businessRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;