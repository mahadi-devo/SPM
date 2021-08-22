import Topbar from '../../shared/topbar';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { AccessRights } from '../../shared/accessRights';
import Ticket from './Ticket';
import TicketHistory from './TicketHistory';
import ViewTicket from './ViewTicket';
import CustomerState from '../../../context/customer/CustomerState';
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';

const CustomerDashboard = () => {
  return (
    <div>
      <Topbar entitlement={[AccessRights.user]} />
      <Container maxW='container.xl' mt='3'>
        <CustomerState>
          <Tabs isFitted>
            <TabList mb='1em'>
              <Tab>Ticket</Tab>
              <Tab>Ticket History</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Ticket />
              </TabPanel>
              <TabPanel>
                <TicketHistory />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CustomerState>
      </Container>
      <Router>
        <Switch>
          <Route exact path='/ticket/:id' component={ViewTicket} />
        </Switch>
      </Router>
    </div>
  );
};

export default CustomerDashboard;
