import {Col, Nav, Row, Tab} from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="container">
          <Col sm={2} style={{ minHeight: '100vh' }} className="bg-light">
            <div className="mt-5">
              <Nav className="flex-column">
                <Nav.Item className="my-2">
                  <Nav.Link eventKey="ticket-mng">Tickets</Nav.Link>
                </Nav.Item>
                <Nav.Item className="my-2">
                  <Nav.Link eventKey="status-mng">Statuses</Nav.Link>
                </Nav.Item>
                <Nav.Item className="my-2">
                  <Nav.Link eventKey="department-mng">Departments</Nav.Link>
                </Nav.Item>
                <Nav.Item className="my-2">
                  <Nav.Link eventKey="user-mng">Users</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col sm={10}>
            <div className="mt-5">
            <Tab.Content>
              <Tab.Pane eventKey="ticket-mng">
                <p>tab 1</p>
              </Tab.Pane>
              <Tab.Pane eventKey="status-mng">
                <p>tab 2</p>
              </Tab.Pane>
              <Tab.Pane eventKey="department-mng">
                <p>tab 3</p>
              </Tab.Pane>
              <Tab.Pane eventKey="user-mng">
                <p>tab 4</p>
              </Tab.Pane>
            </Tab.Content>
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Sidebar;
