import React, { memo, useEffect, useState } from 'react';
import logo from 'assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CookiesStorage } from 'shared/configs/cookie';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/HomePage/saga';
import reducer from 'containers/HomePage/reducer';
import { makeSelectDataProduct } from '../../containers/HomePage/selectors';
import { getViewHomeProduct } from '../../containers/HomePage/actions';

const key = 'home';

function AsideMenu({ onGetViewHomeProduct }) {
  const { pathname } = useLocation();
  const [filterCategory, setFilterCategory] = useState('');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleFilter = filter => {
    CookiesStorage.setCookieData('filterCategory', filter);
    setFilterCategory(filter);

    handleFetchData(filter);
  };

  const handleFetchData = filter => {
    const data = {
      searchFilters: [
        {
          property: 'category',
          operator: 'LIKE',
          value: filter,
        },
      ],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: 0,
      size: 12,
    };
    onGetViewHomeProduct(data, params);
  };

  useEffect(() => {
    const data = {
      searchFilters: [
        {
          property: 'category',
          operator: 'LIKE',
          value: '',
        },
      ],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: 0,
      size: 12,
    };
    onGetViewHomeProduct(data, params);
  }, []);

  return (
    <div className="aside-menu">
      <div className="aside-menu__logo">
        <Link className="header__logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {pathname === '/products' && (
        <>
          <div className="aside-menu__title">
            <h1>Explore</h1>
          </div>
          <ul className="aside-menu__list">
            <li
              className={`aside-menu__item ${filterCategory === '' &&
                'active-filter'} `}
              onClick={() => handleFilter('')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/hair-gifts-bubble?w=194&amp;h=194"
              />
              Shop All
            </li>
            <li
              className={`aside-menu__item ${filterCategory ===
                'shampoo & conditioner' && 'active-filter'} `}
              onClick={() => handleFilter('shampoo & conditioner')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/shampoo-conditioner-bubble?w=205&amp;h=205"
              />
              Shampoo & Conditioner
            </li>
            <li
              className={`aside-menu__item ${filterCategory ===
                'styling products' && 'active-filter'} `}
              onClick={() => handleFilter('styling products')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/styling-products-bubble?w=205&amp;h=205"
              />
              Styling Product
            </li>
            <li
              className={`aside-menu__item ${filterCategory === 'accessories' &&
                'active-filter'} `}
              onClick={() => handleFilter('accessories')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/accessories-bubble?w=205&amp;h=205"
              />
              Accessories
            </li>
            <li
              className={`aside-menu__item ${filterCategory === 'hair color' &&
                'active-filter'} `}
              onClick={() => handleFilter('hair color')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/hair-color-bubble?w=205&amp;h=205"
              />
              Hair Color
            </li>
            <li
              className={`aside-menu__item ${filterCategory ===
                'hair styling tools' && 'active-filter'} `}
              onClick={() => handleFilter('hair styling tools')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/hair-styling-tools-bubble?w=205&amp;h=205"
              />
              Hair Styling Tools
            </li>
            <li
              className={`aside-menu__item ${filterCategory ===
                'hair brushes & combs' && 'active-filter'} `}
              onClick={() => handleFilter('hair brushes & combs')}
            >
              <img
                className=""
                alt=""
                src="https://media.ulta.com/i/ulta/brushes-combs-bubble?w=194&amp;h=194"
              />
              Hair Brushes
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProduct: makeSelectDataProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetViewHomeProduct: (data, params) =>
      dispatch(getViewHomeProduct(data, params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AsideMenu);
