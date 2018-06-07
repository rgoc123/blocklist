export const fetchAddress = (addressId) => {
  return $.ajax({
    url: `https://blockchain.info/rawaddr/${addressId}cors=true`,
    method: 'GET',
    async: false,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    xhrFields: {
      withCredentials: false
    },
    permissions: [
      'http://localhost:3000/*'
    ],
    headers: {
      // Set any custom headers here.
      // If you set any non-simple headers, your server must include these
      // headers in the 'Access-Control-Allow-Headers' response header.
      // "Access-Control-Allow-Origin": "*"
    },
    success: (data) => console.log(data),
    error: (err) => console.log(err.statusText)
  });
};

export const fetchAddress2 = (addressId) => {
  return $.ajax({
    url: `https://blockchain.info/rawaddr/${addressId}`,
    method: 'GET',
    async: false,
    success: (data) => { return data; },
    error: (err) => { return "error"; }
  });
};

export const fetchAddress3 = (addressId) => {
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
};
