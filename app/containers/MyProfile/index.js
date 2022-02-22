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
import avatarDefault from 'assets/images/avatarDefault.png';
import ChangeInfo from './ChangeInfo';
import ChangePassword from './ChangePassword';
import ProductManagement from './ProductManagement';
import AccountManagement from './AccountManagement';

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
        <div className="information">
          <div className="container">
            <div className="row">
              <div className="col-3" />
              <div className="col-9 content">
                <div className="avatar">
                  <img
                    src={dataProfile?.profile?.linkAvatar || ''}
                    alt="avatar"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = avatarDefault;
                    }}
                  />
                </div>
                <div className="info-text">
                  <h3>
                    {`${dataProfile?.profile?.firstname} ${
                      dataProfile?.profile?.lastname
                    }`}
                  </h3>
                  <p className="username">
                    @{dataProfile?.profile?.account?.username}
                  </p>
                  <div className="info-text__item">
                    <p>
                      <strong>Gender</strong>
                      {dataProfile?.profile?.gender === true
                        ? 'Male'
                        : dataProfile?.profile?.gender === false
                        ? 'Female'
                        : '-'}
                    </p>
                    <p>
                      <strong>Date of birth</strong>
                      {dataProfile?.profile?.birthday || '-'}
                    </p>
                  </div>
                  <div className="info-text__item">
                    <p>
                      <strong>Phone</strong>
                      {dataProfile?.profile?.mobile || '-'}
                    </p>
                    <p>
                      <strong>Address</strong>
                      {dataProfile?.profile?.address || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" container tabs-profile">
          <Tabs defaultActiveKey="1">
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
            <TabPane tab="My Purchase" key="3">
              There&apos;s nothing here
            </TabPane>
            <TabPane tab="My Vouchers" key="4">
              There&apos;s nothing here
            </TabPane>
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Product Management" key="5">
                <ProductManagement
                  dataAddProduct={dataAddProduct}
                  onAddProductItem={onAddProductItem}
                />
              </TabPane>
            )}
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Hair Style Management" key="6">
                <ProductManagement
                  dataAddProduct={dataAddProduct}
                  onAddProductItem={onAddProductItem}
                />
              </TabPane>
            )}
            {dataProfile?.profile?.account?.roles[0]?.name === 'ADMIN' && (
              <TabPane tab="Account Management" key="7">
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
