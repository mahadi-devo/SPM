import AdminDashboard from './components/admin/AdminDashboard';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './components/auth/Login';
import CustomerDashboard from './components/customer/CustomerDashboard';
import Register from './components/auth/Register';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route from='/customer' exact component={CustomerDashboard} />
          <Route from='/admin' component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
