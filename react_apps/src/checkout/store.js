import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import {basketData, basketUi, shippingData, order} from './reducers';
import { braintreeData } from '../braintree_payment/reducers';


// Combine all reducers
const rootReducer = combineReducers({
    basketData,
    basketUi,
    shippingData,
    order,
    braintreeData, 
    form: formReducer
});

const middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}
// Create the store for the app
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;
