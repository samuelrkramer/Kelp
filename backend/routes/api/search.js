const express = require('express');
const asyncHandler = require('express-async-handler');

const { Op } = require('sequelize');

const { restoreUser } = require('../../utils/auth');
const { User, Business, Review } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// search I guess
router.get(
  // "/:query(\\w+)",
  "/",
  asyncHandler(async (req, res, next) => {
    // const query = req.params.query;
    const q = req.query.q;
    // console.log("query:",q)
    const businesses = await Business.findAll({
      where: {
        title: {
          [Op.iLike]: `%${q}%`,
        },
      }
    });
    
  // if (!business) {
    //   const err = new Error('Not found');
    //   err.status = 404;
    //   err.title = 'Business not found';
    //   err.errors = ['The business with given ID was not found.'];
    //   return next(err);
    // }
    
    return res.json( businesses );
  })
);

// New business
// router.post(
//   '/',
//   validateBusiness,
//   restoreUser,
//   asyncHandler(async (req, res, next) => {
//     const { title, description, imgUrl, address, city, state, zipCode, lat, lng } = req.body;

//     const { user } = req;

//     if (!user) {
//       const err = new Error('Must be logged in');
//       err.status = 401;
//       err.title = 'Unauthorized';
//       err.errors = ['Only logged-in users may create a business.'];
//       return next(err);
//     }

//     const newBusiness = {
//       ownerId: user.id,
//       title, description,
//       imgUrl, address,
//       city, state,
//       zipCode, lat, lng
//     }

//     if (!lat || !lng) {
//       newBusiness.lat = null;
//       newBusiness.lng = null;
//     }

//     const result = await Business.create(newBusiness);

//     res.json(result);
//   })
// );

// // All Businesses view
// router.get(
//   "/",
//   asyncHandler(async (req, res, next) => {
//     const businesses = await Business.findAll( {
//       include: [{
//         model: User,
//         attributes: ['id', 'username']
//       }, {
//         model: Review,
//         attributes: ['id', 'rating']
//         // include: [{  // probably just need aggregate info from reviews for the frontpage
//         //   model: User,
//         // }]
//       }]
//     });

//     return res.json( businesses );
//   })
// );


// // Edit business
// router.put(
//   "/:businessId(\\d+)",
//   validateBusiness,
//   restoreUser,
//   asyncHandler(async function (req, res, next) {
//     const { user } = req;
  
//     if (!user) {
//       const err = new Error("Must be logged in");
//       err.status = 401;
//       err.title = "Unauthorized";
//       err.errors = ["Only logged-in users may create a business."];
//       return next(err);
//     }

//     const businessId = parseInt(req.params.businessId);
//     // console.log("busId", businessId, typeof(businessId))
//     const business = await Business.findByPk(businessId);
//     // const newBusiness = {...business, ...req.body} // PUT replaces the entire record, not updates individual fields
//     // console.log("req body: ", req.body)
//     // console.log("existing business:",business)

//     const { title, description, imgUrl, address, city, state, zipCode, lat, lng } = req.body;

//     if (user.id !== business.ownerId) {
//       const err = new Error('Must be business owner');
//       err.status = 403;
//       err.title = "Forbidden";
//       err.errors = ["Only the business owner may edit a business."]
//       return next(err)
//     }

//     const newBusiness = {
//       ownerId: user.id,
//       title, description,
//       imgUrl, address,
//       city, state,
//       zipCode, lat, lng
//     }

//     if (!lat || !lng) {
//       newBusiness.lat = null;
//       newBusiness.lng = null;
//     }

//     const result = await business.update(newBusiness)

//     return res.json(result);
//   })
// );

// // Delete business
// router.delete(
//   "/:businessId(\\d+)",
//   restoreUser,
//   asyncHandler(async function (req, res, next) {
//     const { user } = req;
    
//     if (!user) {
//       const err = new Error("Must be logged in");
//       err.status = 401;
//       err.title = "Unauthorized";
//       err.errors = ["Only logged-in users may create a business."];
//       return next(err);
//     }
    
//     const businessId = parseInt(req.params.businessId);

//     const business = await Business.findByPk(businessId);

//     if (user.id !== business.ownerId) {
//       const err = new Error('Must be business owner');
//       err.status = 403;
//       err.title = "Forbidden";
//       err.errors = ["Only the business owner may delete a business."]
//       return next(err)
//     }

//     const result = await business.destroy();

//     console.log(result);

//     return res.json(businessId);
//   })
// );

// const validateReview = [
//   check('businessId')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a businessId (and stop forging requests).'),
//   check('rating')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a rating.'),
//   check('answer')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage('Please provide a review.'),
//   check('imgUrl')
//     .optional({ checkFalsy: true })
//     .isURL({ checkFalsy: true })
//     .withMessage("Optional image URL must be an URL"),
//   handleValidationErrors
// ];

// // New review
// router.post(
//   '/:businessId(\\d+)/reviews',
//   validateReview,
//   restoreUser,
//   asyncHandler(async (req, res, next) => {
//     const { user } = req;
//     if (!user) {
//       const err = new Error('Must be logged in');
//       err.status = 401;
//       err.title = 'Unauthorized';
//       err.errors = ['Only logged-in users may leave reviews.'];
//       return next(err);
//     }

//     const businessId = parseInt(req.params.businessId);

//     const { rating, answer, imgUrl } = req.body;

//     const newReview = {
//       userId: user.id,
//       businessId, rating,
//       answer, imgUrl
//     }

//     const result = await Review.create(newReview);

//     res.json(result);
//   })
// );

// // All reviews for one business
// router.get(
//   "/:businessId(\\d+)/reviews",
//   asyncHandler(async (req, res, next) => {
//     const businessId = parseInt(req.params.businessId);

//     const reviews = await Review.findAll( {
//       where: {
//         'businessId': {
//           [Op.eq]: businessId
//         }
//       },
//       include: [{
//         model: User,
//         attributes: ['id', 'username']
//       }]
//     });

//     return res.json( reviews );
//   })
// );

module.exports = router;