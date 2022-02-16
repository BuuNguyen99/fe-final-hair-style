import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ROLES } from 'shared/constants/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import RouteCommon from 'routing/Route';
import HomePage from 'containers/HomePage';
import LoadingIndicator from 'components/LoadingIndicator';
import MyProfile from 'containers/MyProfile';
const { ROUTING } = ENDPOINT;

function PrivateRoutes({ roles }) {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <RouteCommon
          path={ROUTING.HOME}
          component={HomePage}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />
        <RouteCommon
          path={ROUTING.MY_PROFILE}
          component={MyProfile}
          roles={roles}
          requiredRoles={[ROLES.ADMIN, ROLES.EMPLOYEE]}
        />

        <Redirect exact from={ROUTING.LOGIN_SUCCESS} to={ROUTING.HOME} />
        <Redirect exact from="/" to={ROUTING.HOME} />
        <Redirect to={ROUTING.ERROR_404} />
      </Switch>
    </Suspense>
  );
}

export default PrivateRoutes;
