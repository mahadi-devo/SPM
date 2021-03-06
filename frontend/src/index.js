import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import AuthState from './context/auth/AuthState';
import DepartmentState from './context/department/departmentState';
import UserState from './context/admin/user/userState';
import TicketState from './context/admin/ticket/ticketState';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthState>
        <UserState>
          <TicketState>
            <DepartmentState>
              <App />
            </DepartmentState>
          </TicketState>
        </UserState>
      </AuthState>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
