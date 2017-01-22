import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { fetchTotalBasketItems } from './actions';
import CurrentBasket from './Basket';
import store from './store';

// Importing will expose `addBasketItem` to a global `Products`
// var thanks to a webpack hook
import addBasketItem from '../products/products';

const target = document.getElementById('checkout-app');

// Get the number of items in the basket whenever the script is loaded
store.dispatch(fetchTotalBasketItems());

ReactDOM.render(
  <Provider store={store}>
    <CurrentBasket />
  </Provider>,
  target
);
