export const fetchAddress = (addressId) => {
  return $.ajax({
    url: `https://blockchain.info/rawaddr/${addressId}`,
    method: 'GET',
    error: (err) => console.log(err)
  });
};
