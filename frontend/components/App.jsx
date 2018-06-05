import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import { fetchAddress } from '../util/address_api_util';

import AddressShowContainer from './address_show_container';

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-container">

        <h1>Blocklist</h1>

        <form onSubmit={fetchAddress('1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY')}>
          <input type="text" />
          <input type="button" value="Find address" />
        </form>

      </div>
    );
  }

}

export default App;
