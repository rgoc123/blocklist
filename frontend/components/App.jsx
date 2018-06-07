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
      currentShownAddress: "",
      currentShownBalance: 0,
      currentShownTxs: []
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
      .then(function(data) {console.log(data.address);},
        function(err) {console.log(err);});
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = this.props.fetchAddress2(this.state.address);
    console.log(data.responseJSON);
    this.setState({
      currentShownAddress: data.responseJSON.address,
      currentShownBalance: data.responseJSON.final_balance,
      currentShownTxs: data.responseJSON.txs
    });
  }

  // Create funciton that returns a div with the address and balance spans
  // and the ul with transcation li's
  // If there is no current balance then show nothing, else show the div

  createAddressDiv() {
    // Having a binding issue I think
    let txs = this.state.currentShownTxs;
    function makeTxLIs(txs) {
      if (txs.length > 0) {
        return txs.map(tx => (
          <li>
            <span>Block Height: {tx.block_height}</span>
          </li>
        ));
      }
    }

    if (this.state.currentShownAddress === "") {
      return null;
    } else {
      return (
        <div>
          <span>{this.state.currentShownAddress}</span>
          <span>{this.state.currentShownBalance}</span>
          {makeTxLIs(txs)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="app-container">

        <h1>Blocklist</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.updateAddressSearchState()} />
          <input type="submit" value="Find address" />
        </form>

        {this.createAddressDiv()}

      </div>
    );
  }

}

export default App;
