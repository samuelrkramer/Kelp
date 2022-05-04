import { csrfFetch } from './csrf';

const LOAD_BUSINESSES = 'business/LOAD_BUSINESSES';
const ADD_BUSINESS = 'business/addBusiness';

const loadBusinesses = list => ({
  type: LOAD_BUSINESSES,
  list
});

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
  const response = await fetch("/api/business");

  if (response.ok) {
    const list = await response.json();
    dispatch(loadBusinesses(list));
  }
}

const initialState = { user: null };

const businessReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_BUSINESSES:
      const businesses = {};
      action.list.forEach(el => {
        businesses[el.id] = el;
      });
      return {
        ...businesses,
        ...state,
        list: action.list
      };
    case ADD_BUSINESS:
      newState = Object.assign({}, state);
      newState.business = action.payload;
      return newState;
    default:
      return state;
  }
};

export default businessReducer;