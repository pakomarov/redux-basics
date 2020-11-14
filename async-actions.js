const { createStore, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest());
  axios.get('http://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const users = response.data.map(user => user.id);
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(fetchUsersFailure(error.message));
    })
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => { console.log(store.getState()); });

store.dispatch(fetchUsers());
