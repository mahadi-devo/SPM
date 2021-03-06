import { Box, useColorModeValue } from '@chakra-ui/react';
import { AccessRights } from '../../shared/accessRights';
import Sidebar from '../../shared/sidebar';
import PrivateRoute from '../../shared/privateRoute';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import Ticket from '../ticket/ticket';
import User from '../user/UserRoute';
import Topbar from '../../shared/topbar';
import Department from '../../department';
import EditTicket from '../ticket/editTicket';
import Login from '../../auth/Login';
import CustomerState from '../../../context/customer/CustomerState';

const AdminDashboard = () => {
  const { path } = useRouteMatch();
  return (
    <Router>
      <CustomerState>
        <Box minH='100vh' bg='#rgba(255, 255, 255, 0.80)'>
          <Switch>
            <Route exact path='/login' component={Login} />
          </Switch>
          <Sidebar />

          <Topbar
            entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
          />

          <Box ml={{ base: 0, md: 60 }} p='4'>
            <Switch>
              <PrivateRoute
                exact
                path={`${path}`}
                component={Ticket}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
              <PrivateRoute
                exact
                path={`${path}/edit`}
                component={EditTicket}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
              <PrivateRoute
                exact
                path={`${path}/tickets`}
                component={Ticket}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
              <PrivateRoute
                exact
                path={`${path}/tickets/edit`}
                component={EditTicket}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
              <PrivateRoute
                path={`${path}/users`}
                component={User}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
              <PrivateRoute
                path={`${path}/departments`}
                component={Department}
                entitlement={[
                  AccessRights.admin,
                  AccessRights.organizationalUser,
                ]}
              />
            </Switch>
          </Box>
        </Box>
      </CustomerState>
    </Router>
  );
};

export default AdminDashboard;
