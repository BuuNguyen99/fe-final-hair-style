import React from 'react';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

function AsideMenu() {
  return (
    <div className="aside-menu">
      <div className="aside-menu__logo">
        <Link className="header__logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="aside-menu__title">
        <h1>Explore</h1>
      </div>
      <ul className="aside-menu__list">
        <li className="aside-menu__item"> New In</li>
        <li className="aside-menu__item"> Clothing</li>
        <li className="aside-menu__item"> Shoes</li>
        <li className="aside-menu__item"> Accessories</li>
        <li className="aside-menu__item">Activewear</li>
        <li className="aside-menu__item">Gifts & Living</li>
        <li className="aside-menu__item">Inspiration</li>
      </ul>
    </div>
  );
}

export default AsideMenu;
