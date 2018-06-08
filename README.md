# BLOCKLIST

BLOCKLIST is an application that uses the blockchain.info API to find balance and transaction data on bitcoin addresses.

Simply enter a bitcoin address in the search field to see the data for that address.

![alt text](./app/assets/images/blocklist.gif)

### Code Examples
To access the data from the Blockchain API, when the "Find Address" button is clicked, an fetch request is made combining the input bitcoin address with Blockchain's API address. Fetch was used because it's a web standard more modern than AJAX. Through promises, the fetch request updates the component's state with either the data or an error message.

```javascript
let searchURL = "https://blockchain.info/rawaddr/" + this.state.searchAddress;
fetch(searchURL, {
  method: 'GET',
  async: false,
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Origin": "",
    "Access-Control-Allow-Origin": "*://*/*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}).then((data) => {
  if (data.ok) {
    data.json().then((newData) => {
      console.log(newData);
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
```


### Requirements
Due Cross-Origin Resource Sharing (CORS), you must use Google Chrome and add the Allow-Control-Allow-Origin extension and turn it on. It's linked below.

![alt text](./app/assets/images/acao.png)


### Technologies Used
- React and Javascript
- [Blockchain API](https://blockchain.info/api/blockchain_api)
- [Allow-Control-Allow-Origin Chrome extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog)
