import React from 'react';
import ReactDOM from 'react-dom';

import { fetchAddress, fetchAddress2 } from './util/address_api_util';
import configureStore from './store/store';

import App from './components/App';

//Testing start
window.fetchAddress = fetchAddress;
//Testing end

document.addEventListener('DOMContentLoaded', () => {
  window.$ = $;
  let store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<App fetchAddress={fetchAddress} fetchAddress2={fetchAddress2} />, root);
});
