import { createSelector } from 'reselect';
import { initialState } from 'containers/Auth/reducer';

const selectAuth = state => state.home || initialState;

const makeSelectDataProduct = () =>
  createSelector(
    selectAuth,
    authState => authState.dataProduct,
  );

export { selectAuth, makeSelectDataProduct };
