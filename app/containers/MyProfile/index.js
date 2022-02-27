/* eslint-disable no-nested-ternary */
import { compose } from 'redux';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import {
  makeSelectMyProfile,
  makeSelectUpdateMyProfile,
  makeSelectChangePasswordAccount,
  makeSelectAddProduct,
} from 'containers/Auth/selectors';
import {
  updateProfile,
  changePasswordAccount,
  addProductItem,
} from 'containers/Auth/actions';
import ChangeInfo from './ChangeInfo';
import ChangePassword from './ChangePassword';
import ProductManagement from './ProductManagement';
import AccountManagement from './AccountManagement';
import HairStyleManagement from './HairStyleManagement';

const { TabPane } = Tabs;

function MyProfile({
  dataProfile,
  dataUpdateProfile,
  onUpdateProfile,
  dataChangePassword,
  onChangePasswordAccount,
  dataAddProduct,
  onAddProductItem,
}) {
  const history = useHistory();
  return (
    <div className="my-profile">
      <div className="header-title">
        <h2>
          <svg
            width="18px"
            height="17px"
            viewBox="0 0 18 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => history.goBack()}
          >
            <g
              id="prev"
              transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
            >
              <polygon
                className="arrow"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <polygon
                className="arrow-fixed"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z" />
            </g>
          </svg>
          My Profile
        </h2>
      </div>
      <div className=" my-profile__info mt-5">
        <div className="tabs-profile mt-5">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="My Account" key="1">
              <ChangeInfo
                profile={dataProfile?.profile}
                dataUpdateProfile={dataUpdateProfile}
                onUpdateProfile={onUpdateProfile}
              />
            </TabPane>
            <TabPane tab="Change Password" key="2">
              <ChangePassword
                dataChangePassword={dataChangePassword}
                onChangePasswordAccount={onChangePasswordAccount}
              />
            </TabPane>
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Product Management" key="3">
                <ProductManagement
                  dataAddProduct={dataAddProduct}
                  onAddProductItem={onAddProductItem}
                />
              </TabPane>
            )}
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Hair Style Management" key="4">
                <HairStyleManagement />
              </TabPane>
            )}
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Account Management" key="5">
                <AccountManagement />
              </TabPane>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
  dataUpdateProfile: makeSelectUpdateMyProfile(),
  dataAddProduct: makeSelectAddProduct(),
  dataChangePassword: makeSelectChangePasswordAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUpdateProfile: (data, callBack) =>
      dispatch(updateProfile(data, callBack)),
    onChangePasswordAccount: (data, callBack) =>
      dispatch(changePasswordAccount(data, callBack)),
    onAddProductItem: (data, callBack) =>
      dispatch(addProductItem(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyProfile);
