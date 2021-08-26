import React, { useReducer } from 'react';
import axios from 'axios';

import { ADD_DEPARTMENT, GET_DEPARTMENTS } from './actions';
import departmentContext from './departmentContext';
import departmentReducer from './departmentReducer';

const DepartmentState = (props) => {
  const initialState = {
    depatments: [],
  };

  const [state, dispatch] = useReducer(departmentReducer, initialState);

  const getDeartment = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
       const result = await axios.get('/api/v1/department',config);
       dispatch({
        type: GET_DEPARTMENTS,
        payload: result.data.department,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const addDeparment = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/department', formData, config);

      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.data.department,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <departmentContext.Provider
      value={{
        depatments: state.depatments,
        addDeparment,
        getDeartment,
      }}
    >
      {props.children}
    </departmentContext.Provider>
  );
};

export default DepartmentState;
