import { Box, useColorModeValue } from "@chakra-ui/react";
import { AccessRights } from "../../shared/accessRights";
import Sidebar from "../../shared/sidebar";
import PrivateRoute from "../../shared/privateRoute";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Ticket from "../ticket/ticket";
import Topbar from "../../shared/topbar";

const AdminDashboard = () => {
  const { path } = useRouteMatch();
  return (
    <Router>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Sidebar />
        <Topbar
          entitlement={[AccessRights.admin, AccessRights.organizationalUser]}
        />
        <Box ml={{ base: 0, md: 60 }} p="4">
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
              path={`${path}/tickets`}
              component={Ticket}
              entitlement={[
                AccessRights.admin,
                AccessRights.organizationalUser,
              ]}
            />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};

export default AdminDashboard;
