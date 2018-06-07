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
          <li key={tx.hash}>
            <span>Tx Index:</span>
            <span>{tx.tx_index}</span>
            <span>Tx Hash:</span>
            <span>{tx.hash}</span>
          </li>
        ));
      }
    }

    if (this.state.currentShownAddress === "") {
      return null;
    } else {
      return (
        <div id="address">
          <div id="address-info">
            <div>
              <span className="address-info-title">Bitcoin Address:</span>
              <span>{this.state.currentShownAddress}</span>
            </div>
            <div id="address-info-balance">
              <span className="address-info-title">Address Balance:</span>
              <span>{this.state.currentShownBalance}</span>
            </div>
          </div>
          <div id="transactions-info">
            <span className="address-info-title">Transactions</span>
            <ul id="transactions">
              {makeTxLIs(txs)}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="app-container">

        <h1>BLOCKLIST</h1>

        <form onSubmit={this.handleSubmit}>
          <input id="input-search-address"
            type="text"
            onChange={this.updateAddressSearchState()}
            placeholder="SEARCH BITCOIN ADDRESS" />
          <input id="input-search-submit"
            type="submit"
            value="FIND ADDRESS" />
        </form>

        {this.createAddressDiv()}

      </div>
    );
  }

}

export default App;
