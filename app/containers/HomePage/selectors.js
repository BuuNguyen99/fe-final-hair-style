import { createSelector } from 'reselect';
import { initialState } from 'containers/HomePage/reducer';

const selectHomePage = state => state.home || initialState;

const makeSelectDataProduct = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataProduct,
  );

const makeSelectDeleteProduct = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.deleteProduct,
  );

const makeSelectPopularProduct = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataPopular,
  );

const makeSelectDataAccount = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataAccount,
  );

const makeSelectAddDataAccount = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataAddAccount,
  );

const makeSelectDetailAccount = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataDetailAccount,
  );

const makeSelectDetailProduct = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataDetailProduct,
  );

const makeSelectDataComment = () =>
  createSelector(
    selectHomePage,
    homeState => homeState.dataComment,
  );

export {
  selectHomePage,
  makeSelectDataProduct,
  makeSelectDeleteProduct,
  makeSelectPopularProduct,
  makeSelectDataAccount,
  makeSelectAddDataAccount,
  makeSelectDetailAccount,
  makeSelectDetailProduct,
  makeSelectDataComment,
};
