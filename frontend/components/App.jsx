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
      searchAddress: "",
      currentShownAdress: "",
      currentShownAdressTxs: []
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
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(function(data) {console.log(data);},
        function(err) {console.log(err);});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchAddress2(this.state.address);
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
