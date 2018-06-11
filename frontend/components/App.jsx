import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

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

  // Updates the search value that will be submitted when the
  // "Find Address" button is clicked.
  updateAddressSearchState() {
    return e => this.setState({
      searchAddress: e.currentTarget.value
    });
  }

  // This is the main search function for looking up bitcoin addresses.
  // It makes the get request to the Blockchain API. If it successfully
  // retrieves data it updates the component's state with the
  // information that will be needed for rendering the bitcoin address'
  // balance and transactions; otherwise, it will update the state with
  // info needed to render the error message.
  handleSubmit(e) {
    e.preventDefault();

    let searchURL = "https://blockchain.info/rawaddr/" + this.state.searchAddress;
    fetch(searchURL, {
      method: 'GET',
      async: false,
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
        "Origin": "",
        "Access-Control-Allow-Origin": "*://*/*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    }).then((data) => {
      if (data.ok) {
        data.json().then((newData) => {
          this.setState({
            currentShownAddress: newData.address,
            currentShownBalance: newData.final_balance,
            currentShownTxs: newData.txs
          });
        });
      } else {
        this.setState({
          currentShownAddress: "error"
        });
      }
    });

    // Below is a previous example of using an AJAX
    // request to accomplish the same as above. The
    // above was used to implement more modern web
    // standards.
    // let data = this.props.fetchAddress(this.state.searchAddress);
    // if (data.status !== 200) {
    //   this.setState({
    //     currentShownAddress: "error"
    //   });
    // } else {
    //   this.setState({
    //     currentShownAddress: data.responseJSON.address,
    //     currentShownBalance: data.responseJSON.final_balance,
    //     currentShownTxs: data.responseJSON.txs
    //   });
    // }
  }


  // This makes the div that will have the search address' balance and
  // transaction data.
  createAddressDiv() {
    // This makes the makes all of the line items for the list of
    // transactions for a bitcoin address, which will be appear in the UL
    // below.
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

    // This block creates either the address info div or the error
    // message
    if (this.state.currentShownAddress === "") {
      return null;
    } else if (this.state.currentShownAddress === "error") {
      // If the fetch request returns an error, the below error message
      // is rendered.
      return (
        <div id="error-message">
          <div id="error-message-positioning-div">
            <p>We're sorry.</p>
            <p>Either the address entered is invalid or we don't have information on that particular address.</p>
          </div>
        </div>
      );
    } else {
      // If the fetch is successful, then a div with the address, balance,
      // and list of transcations is created.
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
