import React from 'react';
import logo from 'assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';

function AsideMenu() {
  const { pathname } = useLocation();

  const checkPathname = pathname.includes('/products');
  return (
    <div className="aside-menu">
      <div className="aside-menu__logo">
        <Link className="header__logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {checkPathname && (
        <>
          <div className="aside-menu__title">
            <h1>Explore</h1>
          </div>
          <ul className="aside-menu__list">
            <li className="aside-menu__item"> Shop All</li>
            <li className="aside-menu__item"> Shampoo & Conditioner</li>
            <li className="aside-menu__item"> Styling Product</li>
            <li className="aside-menu__item"> Accessories</li>
            <li className="aside-menu__item">Hair Color</li>
            <li className="aside-menu__item">Hair Styling Tools</li>
            <li className="aside-menu__item">Hair Brushes & Combs</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default AsideMenu;
