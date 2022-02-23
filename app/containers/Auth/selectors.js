import { createSelector } from 'reselect';
import { initialState } from 'containers/Auth/reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectMyProfile = () =>
  createSelector(
    selectAuth,
    authState => authState.dataProfile,
  );

const makeSelectUpdateMyProfile = () =>
  createSelector(
    selectAuth,
    authState => authState.updateProfile,
  );

const makeSelectRegisterAccount = () =>
  createSelector(
    selectAuth,
    authState => authState.registerAccount,
  );

const makeSelectLoginAccount = () =>
  createSelector(
    selectAuth,
    authState => authState.dataUser,
  );

const makeSelectForgotPasswordAccount = () =>
  createSelector(
    selectAuth,
    authState => authState.forgotPassword,
  );

const makeSelectResetPasswordAccount = () =>
  createSelector(
    selectAuth,
    authState => authState.resetPassword,
  );

const makeSelectChangePasswordAccount = () =>
  createSelector(
    selectAuth,
    authState => authState.changePassword,
  );

const makeSelectAddProduct = () =>
  createSelector(
    selectAuth,
    authState => authState.addProduct,
  );

const makeSelectCartProduct = () =>
  createSelector(
    selectAuth,
    authState => authState.dataCart,
  );

export {
  selectAuth,
  makeSelectMyProfile,
  makeSelectRegisterAccount,
  makeSelectUpdateMyProfile,
  makeSelectLoginAccount,
  makeSelectForgotPasswordAccount,
  makeSelectChangePasswordAccount,
  makeSelectResetPasswordAccount,
  makeSelectAddProduct,
  makeSelectCartProduct,
};
