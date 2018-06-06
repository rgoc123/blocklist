import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

//import { fetchAddress } from '../util/address_api_util';

import AddressShowContainer from './address_show_container';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      address: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAddressSearchState() {
    return e => this.setState({
      address: e.currentTarget.value
    });
  }

  fetchAddress3(addressId) {
    fetch(`https://blockchain.info/rawaddr/${addressId}`, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors'
    })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Wadup");
    this.fetchAddress3(this.state.address);//.then(data => (
    //   console.log(data)
    // ), err => (
    //   console.log(err.responseJSON)
    // ));
  }

  render() {
    return (
      <div className="app-container">

        <h1>Blocklist</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.updateAddressSearchState()} />
          <input type="submit" value="Find address" />
        </form>

      </div>
    );
  }

}

export default App;
