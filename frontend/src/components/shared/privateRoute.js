import React from "react";
import { Route, Redirect } from "react-router-dom";
import {ValidateAccessRight} from "./accessRights";

const PrivateRoute = (props) => {

  // Get authentication, userRole from authContext
  let authorized = ValidateAccessRight(props.entitlement);

  return authorized ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
