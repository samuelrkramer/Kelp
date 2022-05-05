const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Review } = require('../../db/models');

const router = express.Router();

// Delete review
router.delete(
  "/:reviewId(\\d+)",
  restoreUser,
  asyncHandler(async function (req, res, next) {
    const { user } = req;
    
    if (!user) {
      const err = new Error("Must be logged in");
      err.status = 401;
      err.title = "Unauthorized";
      err.errors = ["Only logged-in users may delete a review."];
      return next(err);
    }
    
    const reviewId = parseInt(req.params.reviewId);

    const review = await Review.findByPk(reviewId);

    if (user.id !== review.userId) {
      const err = new Error('Must be author');
      err.status = 403;
      err.title = "Forbidden";
      err.errors = ["Only the author may delete a review."]
      return next(err)
    }

    const result = await review.destroy();

    console.log(result);

    return res.json(reviewId);
  })
);

module.exports = router;

// Saving this code in case I add updating reviews later.
// This is the entire Edit Business route

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
//     const result = await business.update(newBusiness)

//     return res.json(result);
//   })
// );