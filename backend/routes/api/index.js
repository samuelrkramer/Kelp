const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./business');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.use('/business', businessRouter);
router.use('/reviews', reviewsRouter);
router.use('/search', searchRouter);

module.exports = router;