import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../shared/privateRoute';
import { AccessRights } from '../../shared/accessRights';
import index from './index';
import UserAdd from './views/UserAdd';

const UserRoute = () => {
  const { url } = useRouteMatch();

  console.log(url);

  console.log('Route hitted');
  return (
    <Route>
      <Switch>
        <PrivateRoute
          exact
          path={`${url}/add`}
          component={UserAdd}
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />

        <PrivateRoute
          exact
          path={`${url}/`}
          component={index}
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />
      </Switch>
    </Route>
  );
};

export default UserRoute;
