import React from 'react';
import { Helmet } from 'react-helmet';
import Header from 'components/Header';
import AsideMenu from 'components/AsideMenu';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage';

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
            <Route path="/" component={HomePage} exact />
          </Switch>
        </div>
      </div>
    </div>
  );
}
