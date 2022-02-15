import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import background from 'assets/images/14.png';
import Login from 'containers/Auth/SignIn';
import Registration from 'containers/Auth/CreateAccount';
import ForgotPasswordAccount from 'containers/Auth/ForgotPasswordAccount';

function Auth() {
  useEffect(() => {
    document.body.classList.add('bg-white');
    return () => {
      document.body.classList.remove('bg-white');
    };
  }, []);

  return (
    <div
      className="vh-100 d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-10">
        <a href="#" className="mb-12">
          <img alt="Logo" src={logo} className="h-100px" />
        </a>

        <div className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/registration" component={Registration} />
            <Route
              path="/auth/forgot-password"
              component={ForgotPasswordAccount}
            />
            <Redirect from="/auth" exact to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Auth;
