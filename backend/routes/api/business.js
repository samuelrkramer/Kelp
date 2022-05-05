const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { User, Business, Review } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateBusiness = [
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

// All Businesses view
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const businesses = await Business.findAll( {
      include: [{
        model: User,
        attributes: ['id', 'username']
      }, {
        model: Review,
        // include: [{  // probably just need aggregate info from reviews for the frontpage
        //   model: User,
        //   attributes: ['id', 'username']
        // }]
      }]
    });

    return res.json( businesses );
  })
);

// Business view
router.get(
  "/:businessId(\\d+)",
  asyncHandler(async (req, res, next) => {
    const businessId = req.params.businessId
    const business = await Business.findByPk(+businessId, {
      include: [{
        model: User,
        attributes: ['id', 'username']
      }, {
        model: Review,
        include: [{
          model: User,
          attributes: ['id', 'username']
        }]
      }]
    });

    // if (!business) {
    //   const err = new Error('Not found');
    //   err.status = 404;
    //   err.title = 'Business not found';
    //   err.errors = ['The business with given ID was not found.'];
    //   return next(err);
    // }

    return res.json( business );
  })
);

// // Log out
// router.delete(
//   '/',
//   (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
//   }
// );
  
    
// // Restore session user
// router.get(
//   '/',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else return res.json({});
//   }
// );

module.exports = router;