import { Popover, Button } from 'antd';
import React, { memo, useRef, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { makeSelectMyProfile } from 'containers/Auth/selectors';
import { getProfile } from 'containers/Auth/actions';
import { CookiesStorage } from '../../shared/configs/cookie';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import { formatPriceVND } from '../../utils/common';
import {
  makeSelectCartProduct,
  makeSelectDataProduct,
} from '../../containers/Auth/selectors';
import {
  getCartProduct,
  getViewHomeProduct,
} from '../../containers/Auth/actions';
import SearchSuggestions from '../SearchSuggestions';

const key = 'auth';

function Header({
  dataProfile,
  dataCart,
  onGetMyProfile,
  onGetCartProduct,
  dataProduct,
  onGetListProduct,
}) {
  const history = useHistory();
  const dropdownRef = useRef(null);
  const isAuthen = CookiesStorage.authenticated();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };

  const logout = () => {
    window.location.reload();
    CookiesStorage.clearData();
    history.push('/');
  };

  useEffect(() => {
    onGetMyProfile();
    onGetCartProduct();

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
      size: 999,
    };
    onGetListProduct(data, params);
  }, []);

  const handleBuyNow = () => {
    history.push('/order-list');
  };

  const content = !dataCart?.isFetching && (
    <div className="products-list">
      {dataCart?.data?.length > 0 ? (
        <>
          {dataCart?.data?.map((el, index) => (
            <Link
              to={`/products/${el?.product?.slug}`}
              className="products-item"
              key={`item-p-${index}`}
            >
              <div className="left">
                <div className="products-item__image">
                  <img src={el?.product?.images[0]?.url} alt="" />
                </div>
                <div className="products-item__contents">
                  <p className="title">{el?.product?.title}</p>
                  <small className="quantity muted">x{el?.quantity}</small>
                </div>
              </div>
              <p className="products-item__price">
                {formatPriceVND(el?.unitPrice.toString())} VND
              </p>
            </Link>
          ))}
          <div className="view-cart">
            <Button type="primary" danger onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </>
      ) : (
        'no data'
      )}
    </div>
  );

  return (
    <div className="header">
      {!dataProduct?.isFetching && (
        <div className="header-search-suggestions">
          <SearchSuggestions data={dataProduct?.data?.content || []} />
        </div>
      )}
      <div className="header-right d-flex align-items-center">
        <section className="header-menu">
          <nav className="fill">
            <ul>
              <li>
                <NavLink
                  to="/products"
                  activeClassName="active"
                  isActive={(match, location) => {
                    if (location.pathname.includes('products')) {
                      return true;
                    }
                  }}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hairs-style"
                  activeClassName="active"
                  isActive={(match, location) => {
                    if (location.pathname.includes('hairs-style')) {
                      return true;
                    }
                  }}
                >
                  Hair Style
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hair-cuts"
                  activeClassName="active"
                  isActive={(match, location) => {
                    if (location.pathname.includes('hair-cuts')) {
                      return true;
                    }
                  }}
                >
                  Hair Cuts and Styles
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
        <div className="header__menu-icon">
          <ul className="icon-list">
            {dataProfile?.profile?.account?.roles[0]?.name === 'USER' && (
              <li className="icon-item">
                <p className="icon-link">
                  <Popover placement="bottomRight" content={content}>
                    <BsCart2 className="icon icon-user" />
                    {dataCart?.data?.length > 0 && (
                      <span className="mark">{dataCart?.data?.length}</span>
                    )}
                  </Popover>
                </p>
              </li>
            )}
            <li className="icon-item">
              <a
                href
                className={`icon-link ${isActive ? 'active-icon' : ''}`}
                onClick={onClick}
              >
                <AiOutlineUser className="icon icon-user" />
                <nav
                  ref={dropdownRef}
                  className={`menu ${isActive ? 'active' : 'inactive'}`}
                >
                  <ul>
                    {isAuthen && (
                      <li>
                        <Link to="/my-profile">My Profile</Link>
                      </li>
                    )}
                    {isAuthen && (
                      <li>
                        <a href className="cursor-pointer" onClick={logout}>
                          Logout
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
  dataCart: makeSelectCartProduct(),
  dataProduct: makeSelectDataProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetMyProfile: () => dispatch(getProfile()),
    onGetCartProduct: () => dispatch(getCartProduct()),
    onGetListProduct: (data, params) =>
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
)(Header);
