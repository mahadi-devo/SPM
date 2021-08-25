import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import AuthState from './context/auth/AuthState';
import UserState from './context/admin/user/UserState';
import DepartmentState from './context/department/departmentState';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthState>
        <UserState>
          <DepartmentState>
            <App />
          </DepartmentState>
        </UserState>
      </AuthState>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
