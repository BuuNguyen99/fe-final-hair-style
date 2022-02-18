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
export { selectHomePage, makeSelectDataProduct, makeSelectDeleteProduct };
