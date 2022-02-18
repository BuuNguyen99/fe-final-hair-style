import React, { useState } from 'react';
import logo from 'assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';

function AsideMenu() {
  const { pathname } = useLocation();
  const [filterCategory, setFilterCategory] = useState('');

  const checkPathname = pathname.includes('/products');

  const handleFilter = filter => {
    setFilterCategory(filter);
  };

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

export default AsideMenu;
