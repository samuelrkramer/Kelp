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
  const response = await csrfFetch("/api/business");
  console.log("getBusinesses thunk fired");

  if (response.ok) {
    const list = await response.json();
    console.log("list:", list);
    dispatch(loadBusinesses(list));
  }
}

export const fetchOneBusiness = (id) => async dispatch => {
  console.log("fetchOneBusiness thunk fired");
  const response = await csrfFetch(`/api/business/${id}`)

  if (response.ok) {
    const business = await response.json();
    console.log("business:", business);
    dispatch(addBusiness(business));
  }
}

const initialState = {
  business: null,
  list: [],
};

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
      if (!state[action.business.id]) {
        const newState = {
          ...state,
          [action.business.id]: action.business
        };
        const businesses = newState.list.map(id => newState[id]);
        businesses.push(action.business);
        return newState;
      }
      return {
        ...state,
        [action.business.id]: {
          ...state[action.business.id],
          ...action.business
        }
      }
    default:
      return state;
  }
};

export default businessReducer;