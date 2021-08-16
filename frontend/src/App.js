import AdminDashboard from './components/admin/AdminDashboard';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Login from './components/auth/Login';
import { AccessRights } from './components/shared/accessRights';
import CustomerDashboard from './components/customer/CustomerDashboard';
import { useContext, useEffect } from 'react';
import AuthContext from './context/auth/authContext';
import Register from './components/auth/Register';

function App() {
  // Get authentication state, userRole from auth Context
  const authenticated = true;
  const userRole = AccessRights.admin;

  // let authenticated = false;
  // let userRole = null;

  // const authContext = useContext(AuthContext);
  // const { isAuthenticated, user } = authContext;
  //
  // authenticated = isAuthenticated;
  // userRole = user && user.role;
  // useEffect(() => {
  //   authenticated = isAuthenticated;
  //   userRole = user && user.role;
  //   // eslint-disable-next-line
  // }, [user, isAuthenticated]);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            render={() =>
              authenticated &&
              (userRole === AccessRights.admin ||
                userRole === AccessRights.organizationalUser) ? (
                <Redirect to='/admin' />
              ) : authenticated && userRole === AccessRights.user ? (
                <Redirect to='/customer' />
              ) : (
                <Login />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={() =>
              authenticated &&
              (userRole === AccessRights.admin ||
                userRole === AccessRights.organizationalUser) ? (
                <Redirect to='/admin' />
              ) : authenticated && userRole === AccessRights.user ? (
                <Redirect to='/customer' />
              ) : (
                <Register />
              )
            }
          />
          <Route
            from='/admin'
            render={() =>
              authenticated &&
              (userRole === AccessRights.admin ||
                userRole === AccessRights.organizationalUser) ? (
                <AdminDashboard />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            from='/customer'
            exact
            render={() =>
              authenticated && userRole === AccessRights.user ? (
                <CustomerDashboard />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            from='/'
            exact
            render={() =>
              authenticated &&
              (userRole === AccessRights.admin ||
                userRole === AccessRights.organizationalUser) ? (
                <Redirect to='/admin' />
              ) : authenticated && userRole === AccessRights.user ? (
                <Redirect to='/customer' />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
