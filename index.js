const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action',
  };
}


// (previousState, action) => newState

const initialState = {
  cakeCount: 10
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.cakeCount - 1,
      };
    default:
      return state;
  }
};

// create store
const store = createStore(reducer);

// access state
console.log('Initial state', store.getState());

// subscribe to store changes
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));

// change state by dispatching actions
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

// unsubscribe
unsubscribe();
