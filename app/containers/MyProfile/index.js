import { compose } from 'redux';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMyProfile } from 'containers/Auth/selectors';

function MyProfile() {
  return <div className="my-profile">11</div>;
}
const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(MyProfile);
