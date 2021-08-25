import React, { useReducer } from 'react';
import axios from 'axios';
import { ADD_USER, GET_USER } from './types';

import UserReducer from './userReducer';
import UserContext from './userContext';

const userState = (props) => {
  const initialState = {
    users: [],
    current: null,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const addUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const data = {};

    data.name = user.userName;
    data.email = user.userEmail;
    data.department = user.department;
    data.password = user.password;
    data.mobile = user.mobile;
    data.role = 2;

    try {
      const res = await axios.post('/api/v1/user', data, config);
      console.log(res);
      dispatch({ type: ADD_USER, payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      const res = await axios.get('/api/v1/user', config);
      dispatch({ type: GET_USER, payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        addUser,
        getUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default userState;
