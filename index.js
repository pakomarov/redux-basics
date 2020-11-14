const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action',
  };
}

const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

function buyIceCream() {
  return {
    type: BUY_ICE_CREAM,
    info: 'Second redux action',
  };
}


// (previousState, action) => newState

const initialState = {
  cakeCount: 10,
  iceCreamCount: 20,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.cakeCount - 1,
      };
    case BUY_ICE_CREAM:
      return {
        ...state,
        iceCreamCount: state.iceCreamCount - 1,
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
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// unsubscribe
unsubscribe();
