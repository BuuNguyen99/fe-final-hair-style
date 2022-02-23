import React from 'react';
import { Helmet } from 'react-helmet';
import Header from 'components/Header';
import AsideMenu from 'components/AsideMenu';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'containers/HomePage';
import MyProfile from 'containers/MyProfile';
import HairsStyle from 'containers/HairsStyle';
import GuestServices from 'containers/GuestServices';
import AboutUs from 'containers/AboutUs';
import BuyProduct from 'containers/BuyProduct';
import ViewCart from 'containers/ViewCart';

export default function MasterLayout() {
  return (
    <div className="d-flex flex-column flex-root">
      <Helmet titleTemplate="%s">
        <meta name="description" content="Hair Style" />
      </Helmet>

      <div className="d-flex">
        <AsideMenu />
        <div className="main container-fluid">
          <Header />
          <Switch>
            <Route path="/products" component={HomePage} exact />
            <Route path="/my-profile" component={MyProfile} exact />
            <Route path="/hairs-style" component={HairsStyle} exact />
            <Route path="/guest-services" component={GuestServices} exact />
            <Route path="/about-us" component={AboutUs} exact />
            <Route path="/products/:slug" component={BuyProduct} />
            <Route path="/order-list" component={ViewCart} />
            <Redirect from="/" exact to="/products" />
            <Redirect to="/products" />
          </Switch>
        </div>
      </div>
    </div>
  );
}
