import { LOAD_REVIEWS, ADD_REVIEW, DELETE_REVIEW } from './reviews';
import { csrfFetch } from './csrf';

const LOAD_BUSINESSES = 'business/LOAD_BUSINESSES';
const LOAD_ONE_BUSINESS = 'business/LOAD_ONE_BUSINESS';
// const SEARCH_BUSINESSES = 'business/SEARCH_BUSINESSES';
const ADD_BUSINESS = 'business/ADD_BUSINESS';
const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS';
const DELETE_BUSINESS = 'business/DELETE_BUSINESS';

const loadBusinesses = businesses => ({
  type: LOAD_BUSINESSES,
  payload: businesses,
});

const loadOneBusiness = business => ({
  type: LOAD_ONE_BUSINESS,
  payload: business,
});

// const loadSearchBusinesses = businesses => ({
//   type: SEARCH_BUSINESSES,
//   payload: businesses,
// });

const addBusiness = (business) => {
  return {
    type: ADD_BUSINESS,
    payload: business,
  };
};

const updateBusiness = (id, data) => {
  return {
    type: UPDATE_BUSINESS,
    payload: {id, data},
  };
};

const removeBusiness = (id) => {
  return {
    type: DELETE_BUSINESS,
    payload: id,
  };
};


export const getBusinesses = () => async dispatch => {
  const response = await csrfFetch("/api/business");
  // console.log("getBusinesses thunk fired");

  if (response.ok) {
    const businesses = await response.json();
    // console.log("businesses:", businesses);
    dispatch(loadBusinesses(businesses));
  }
};

export const searchBusinesses = (query) => async dispatch => {
  const response = await csrfFetch(`/api/search?q=${query}`);
  // console.log("searchBusinesses thunk fired");

  if (response.ok) {
    const businesses = await response.json();
    // console.log("businesses:", businesses);
    dispatch(loadBusinesses(businesses));

    return businesses.map(el => el.id);
    // return businesses;
  }
};

export const fetchOneBusiness = (id) => async dispatch => {
  // console.log("fetchOneBusiness thunk fired");
  const response = await csrfFetch(`/api/business/${id}`)
  
  if (response.ok) {
    const business = await response.json();
    // console.log("business:", business);
    dispatch(loadOneBusiness(business));
  }
};

export const createBusiness = (business) => async (dispatch) => {
  // const newBusiness = { ...business, ownerId: user.id }
  const response = await csrfFetch("/api/business", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(business),
  });
  const data = await response.json();
  dispatch(addBusiness(data));
  return data;
};

export const editBusiness = (business, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(business),
  });
  const data = await response.json();
  dispatch(updateBusiness(id, data));
  return data
};

export const deleteBusiness = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/${id}`, {
    method: "DELETE"
  });
  if (response.ok) {
    const delId = await response.json();
    dispatch(removeBusiness(delId));
  }
};

const initialState = {
  // list: [],  // possibly more advanced than this project
};

const businessReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_BUSINESSES:
      const businesses = {};
      action.payload.forEach(el => {
        businesses[el.id] = el;
      });
      // console.log("from LOAD_BUSINESSES in reducer, businesses:", businesses)
      return {
        ...businesses,
        ...state,
        // list: action.list
      };
    case LOAD_ONE_BUSINESS: {
      const newState = {...state};
      // console.log("action:", action)
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case ADD_BUSINESS: {
      const newState = {
        ...state,
        [action.payload.id]: action.payload
      };
      // const businesses = newState.list.map(id => newState[id]);
      // businesses.push(action.business);
      return newState;
    }
    case UPDATE_BUSINESS: {
      const newState = {
        ...state,
        [action.payload.id]: action.payload.data
      }
      return newState;
    }
    case DELETE_BUSINESS: {
      const newState = {...state};
      delete newState[action.payload]
      return newState;
    }
    case LOAD_REVIEWS: {
      const newState = { ...state };
      newState[action.payload.businessId] = {
        ...state[action.payload.businessId],
        reviews: action.payload.reviews.map(el => el.id)
      };
      return newState;
    }
    case DELETE_REVIEW:
      return {
        ...state,
        [action.payload.businessId]: {
          ...state[action.payload.businessId],
          reviews: state[action.payload.businessId].reviews.filter(
            (revId) => revId !== action.payload.reviewId
          )
        }
      };

    case ADD_REVIEW:
      console.log(action.payload);
      return {
        ...state,
        [action.payload.businessId]: {
          ...state[action.payload.businessId],
          reviews: [...state[action.payload.businessId].reviews, action.payload.review.id]
        }
      };
    default:
      return state;
  }
};

export default businessReducer;