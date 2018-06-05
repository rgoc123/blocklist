import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchAddress } from '../util/address_api_util';

import AddressShow from './address_show';

const mSTP = state => {
  return {

  };
};

const mDTP = dispatch => {
  return {
    fetchAddress: (addressId) => dispatch(fetchAddress(addressId))
  };
};

export default connect(mSTP, mDTP)(AddressShow);
