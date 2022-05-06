import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
// const LOAD_ONE_BUSINESS = 'business/LOAD_ONE_BUSINESS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
// const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadReviews = (reviews, businessId) => ({
  type: LOAD_REVIEWS,
  payload: { reviews, businessId },
});

// const loadOneBusiness = business => ({
//   type: LOAD_ONE_BUSINESS,
//   payload: business,
// });

const addReview = (review, businessId) => {
  return {
    type: ADD_REVIEW,
    payload: { review, businessId },
  };
};

// const updateBusiness = (id, data) => {
//   return {
//     type: UPDATE_BUSINESS,
//     payload: {id, data},
//   };
// };

const removeReview = (reviewId, businessId) => {
  return {
    type: DELETE_REVIEW,
    payload: { reviewId, businessId },
  };
};


export const getBizReviews = (businessId) => async dispatch => {
  const response = await csrfFetch(`/api/business/${businessId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews, businessId));
  }
}

export const createReview = (review, businessId) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${businessId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(review),
  });
  const data = await response.json();
  dispatch(addReview(data));
  return data;
};

// export const editBusiness = (business, id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/business/${id}`, {
//     method: "PUT",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(business),
//   });
//   const data = await response.json();
//   dispatch(updateBusiness(id, data));
//   return data
// };

export const deleteReview = (id, businessId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE"
  });
  if (response.ok) {
    const delId = await response.json();
    dispatch(removeReview(delId, businessId));
  }
}

const initialState = {
  // list: [],  // possibly more advanced than this project
};

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviews = {};
      action.payload.reviews.forEach(el => {
        reviews[el.id] = el;
      });
      // need to double comment that line as a relic from business reducer
      // // console.log("from LOAD_BUSINESSES in reducer, businesses:", businesses)
      return {
        ...reviews,
        ...state,
        // list: action.list
      };
    // case LOAD_ONE_BUSINESS: {
    //   const newState = {...state};
    //   // console.log("action:", action)
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // }
    case ADD_REVIEW: {
      const newState = {
        ...state,
        [action.payload.review.id]: action.payload.review
      };
      return newState;
    }
    // not until I add a U to the CRD for reviews
    // // case UPDATE_BUSINESS: {
    // //   const newState = {
    // //     ...state,
    // //     [action.payload.id]: action.payload.data
    // //   }
    // // }
    case DELETE_REVIEW: {
      const newState = {...state};
      delete newState[action.payload.reviewId]
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;