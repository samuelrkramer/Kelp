const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { User, Business } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBusiness 
restoreUser,= [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a title.'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a description.'),
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide an address.'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a city.'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a state.'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a zip code.'),
  handleValidationErrors
];

// New business
router.post(
  '/',
  validateBusiness,
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { title, description, imgUrl, address, city, state, zipCode, lat, lng } = req.body;

    const { user } = req;

    if (!user) {
      const err = new Error('Must be logged in');
      err.status = 401;
      err.title = 'Unauthorized';
      err.errors = ['Only logged-in users may create a business.'];
      return next(err);
    }

    const newBusiness = {
      ownerId: user.id,
      title, description,
      imgUrl, address,
      city, state,
      zipCode, lat, lng
    }

    const result = await Business.create(newBusiness);

    res.json(result);
  })
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);
  
// Demo user log in
router.get(
  "/demo",
  asyncHandler(async (req, res, next) => {
    const user = await User.getCurrentUserById(1);

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Demo login failed';
      err.errors = ['The demo login mechanism failed.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);
    
// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

module.exports = router;