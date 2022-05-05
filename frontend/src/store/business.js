import { csrfFetch } from './csrf';

const LOAD_BUSINESSES = 'business/LOAD_BUSINESSES';
const LOAD_ONE_BUSINESS = 'business/LOAD_ONE_BUSINESS'
const ADD_BUSINESS = 'business/ADD_BUSINESS';
const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS';
const DELETE_BUSINESS = 'business/DELETE_BUSINESS';

const loadBusinesses = businesses => ({
  type: LOAD_BUSINESSES,
  payload: businesses
});

const loadOneBusiness = business => ({
  type: LOAD_ONE_BUSINESS,
  payload: business
})

const addBusiness = (business) => {
  return {
    type: ADD_BUSINESS,
    payload: business,
  };
};

export const createBusiness = (user, business) => async (dispatch) => {
  const newBusiness = { ...business, ownerId: user.id }
  const response = await csrfFetch("/api/business", {
    method: "POST",
    body: JSON.stringify(newBusiness),
  });
  const data = await response.json();
  dispatch(addBusiness(data.business));
  return response;
};

export const getBusinesses = () => async dispatch => {
  const response = await csrfFetch("/api/business");
  console.log("getBusinesses thunk fired");

  if (response.ok) {
    const businesses = await response.json();
    console.log("businesses:", businesses);
    dispatch(loadBusinesses(businesses));
  }
}

export const fetchOneBusiness = (id) => async dispatch => {
  console.log("fetchOneBusiness thunk fired");
  const response = await csrfFetch(`/api/business/${id}`)

  if (response.ok) {
    const business = await response.json();
    console.log("business:", business);
    dispatch(loadOneBusiness(business));
  }
}

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
      console.log("from LOAD_BUSINESSES in reducer, businesses:", businesses)
      return {
        ...businesses,
        ...state,
        // list: action.list
      };
    case LOAD_ONE_BUSINESS: {
      const newState = {...state};
      console.log("action:", action)
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
    default:
      return state;
  }
};

export default businessReducer;