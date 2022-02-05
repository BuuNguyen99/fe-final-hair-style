import { Popover, Button } from 'antd';
import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import { CookiesStorage } from '../../shared/configs/cookie';

function Header() {
  const history = useHistory();
  const dropdownRef = useRef(null);
  const isAuthen = CookiesStorage.authenticated();

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };

  const logout = () => {
    CookiesStorage.clearData();
    history.push('/');
  };

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
          <nav class="fill">
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
                    {!isAuthen && (
                      <li>
                        <Link to="auth/login">Login</Link>
                      </li>
                    )}
                    {isAuthen && (
                      <li>
                        <Link to="1">My Profile</Link>
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

export default Header;
