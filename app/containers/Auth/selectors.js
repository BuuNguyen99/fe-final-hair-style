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

export {
  selectAuth,
  makeSelectMyProfile,
  makeSelectRegisterAccount,
  makeSelectUpdateMyProfile,
  makeSelectLoginAccount,
  makeSelectForgotPasswordAccount,
  makeSelectResetPasswordAccount,
};
