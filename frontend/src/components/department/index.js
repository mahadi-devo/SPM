import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../shared/privateRoute';
import { AccessRights } from '../shared/accessRights';
import DepartmentHome from './departmentHome';
import DepartmentAdd from './departmentAdd';
import DepartmentView from './departmentView';

const Department = () => {
  const { path } = useRouteMatch();

  return (
    <Route>
      <Switch>
        <PrivateRoute
          exact
          path={`${path}/`}
          component={DepartmentHome}
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />
        <PrivateRoute
          exact
          path={`${path}/add`}
          component={DepartmentAdd}
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />
        <PrivateRoute
          exact
          path={`${path}/view`}
          component={DepartmentView}
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />
      </Switch>
    </Route>
  );
};

export default Department;
