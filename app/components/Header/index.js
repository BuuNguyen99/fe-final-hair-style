import { Popover, Button } from 'antd';
import React, { memo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectMyProfile } from 'containers/Auth/selectors';
import { getProfile } from 'containers/Auth/actions';
import { CookiesStorage } from '../../shared/configs/cookie';
import { useDetectOutsideClick } from './useDetectOutsideClick';

const key = 'auth';

function Header({ onGetMyProfile }) {
  const dropdownRef = useRef(null);
  const isAuthen = CookiesStorage.authenticated();

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const logout = () => {
    window.location.reload();
    CookiesStorage.clearData();
  };

  useEffect(() => {
    onGetMyProfile();
  }, []);

  const content = (
    <div className="products-list">
      <div className="products-item">
        <div className="left">
          <div className="products-item__image">
            <img
              src="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1-400x400.jpg"
              alt=""
            />
          </div>
          <div className="products-item__contents">
            <p className="title">Flycam</p>
            <small className="quantity muted">x4</small>
          </div>
        </div>
        <p className="products-item__price">$299</p>
      </div>
      <div className="products-item">
        <div className="left">
          <div className="products-item__image">
            <img
              src="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1-400x400.jpg"
              alt=""
            />
          </div>
          <div className="products-item__contents">
            <p className="title">Flycam</p>
            <small className="quantity muted">x4</small>
          </div>
        </div>
        <p className="products-item__price">$299</p>
      </div>
      <div className="products-item">
        <div className="left">
          <div className="products-item__image">
            <img
              src="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1-400x400.jpg"
              alt=""
            />
          </div>
          <div className="products-item__contents">
            <p className="title">Flycam</p>
            <small className="quantity muted">x4</small>
          </div>
        </div>
        <p className="products-item__price">$299</p>
      </div>
      <div className="products-item">
        <div className="left">
          <div className="products-item__image">
            <img
              src="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1-400x400.jpg"
              alt=""
            />
          </div>
          <div className="products-item__contents">
            <p className="title">Flycam</p>
            <small className="quantity muted">x4</small>
          </div>
        </div>
        <p className="products-item__price">$299</p>
      </div>
      <div className="view-cart">
        <Button type="primary" danger>
          View Cart
        </Button>
      </div>
    </div>
  );

  return (
    <div className="header">
      <div className="header-left" />
      <div className="header-right d-flex align-items-center">
        <section className="header-menu">
          <nav className="fill">
            <ul>
              <li>
                <a href="#">products</a>
              </li>
              <li>
                <a href="#">story</a>
              </li>
              <li>
                <a href="#">manufacturing</a>
              </li>
              <li>
                <a href="#">packaging</a>
              </li>
            </ul>
          </nav>
        </section>
        <div className="header__menu-icon">
          <ul className="icon-list">
            <li className="icon-item">
              <a href="#" className="icon-link">
                <Popover placement="bottomRight" content={content}>
                  <BsCart2 className="icon icon-user" />
                  {isAuthen && <span className="mark">3</span>}
                </Popover>
              </a>
            </li>
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetMyProfile: () => dispatch(getProfile()),
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
