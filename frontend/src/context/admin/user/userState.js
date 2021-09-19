import React, { useReducer } from 'react';
import axios from 'axios';
import { ADD_USER, GET_USER, CHANGE_SUCESS } from './types';

import { useToast } from '@chakra-ui/react';

import UserReducer from './userReducer';
import UserContext from './userContext';

const UserState = (props) => {
  const initialState = {
    users: [],
    current: null,
    sucess: false,
  };

  const toast = useToast();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const addUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
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
      console.log('🚀 ~ file: userStae.js ~ line 41 ~ addUser ~ formData', res);
      if (res.data.success) {
        toast({
          title: 'User created.',
          description: 'You have created a new user.',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
        getUser();
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
      }

      dispatch({ type: ADD_USER, payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getUser = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.get('/api/v1/user', config);
      dispatch({ type: GET_USER, payload: res.data.users });
    } catch (e) {
      console.error(e);
    }
  };

  const userUpdate = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
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
      const res = await axios.put('/api/get/user', data);
      console.log(
        '🚀 ~ file: userStae.js ~ line 41 ~ updateUser ~ formData',
        res
      );

      if (res.data.success) {
        toast({
          title: 'User Updated.',
          description: 'You have updated the user.',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
        getUser();
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async (_id) => {
    console.log('state', _id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { _id },
    };
    try {
      const res = await axios.delete('/api/v1/user', config);
      if (res.data.success) {
        toast({
          title: 'User Deleted.',
          description: 'You have successfully deleted the user.',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
        getUser();
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeSuccess = () => {
    dispatch({ type: CHANGE_SUCESS, payload: state.sucess });
  };
  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        sucess: state.sucess,
        addUser,
        getUser,
        changeSuccess,
        deleteUser,
        userUpdate,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
