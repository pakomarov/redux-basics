const {createStore, combineReducers, applyMiddleware} = require('redux');
const {createLogger} = require('redux-logger');
const logger = createLogger();

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

const BUY_KEK = 'BUY_KEK';

function buyKek() {
  return {
    type: BUY_KEK,
  };
}


// (previousState, action) => newState

//cake reducer

const initialCakeState = {
  cakeCount: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakeCount: state.cakeCount - 1,
      };
    case BUY_KEK:
      return {
        ...state,
        cakeCount: state.cakeCount - 1000,
      };
    default:
      return state;
  }
};

//ice cream reducer

const initialIceCreamState = {
  iceCreamCount: 10,
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        iceCreamCount: state.iceCreamCount - 1,
      };
    case BUY_KEK:
      return {
        ...state,
        iceCreamCount: state.iceCreamCount - 100,
      };
    default:
      return state;
  }
};

// create store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger));

// access state
console.log('Initial state', store.getState());

// subscribe to store changes
const unsubscribe = store.subscribe(() => {});

// change state by dispatching actions
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyKek());

// unsubscribe
unsubscribe();
