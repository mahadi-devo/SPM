import React, { useReducer } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import { GET_TICKET_OF_DEPARTMENTS, GET_DEPARTMENTS } from './actions';
import departmentContext from './departmentContext';
import departmentReducer from './departmentReducer';

const DepartmentState = (props) => {
  const initialState = {
    depatments: [],
    tickets: [],
  };
  const toast = useToast();

  const [state, dispatch] = useReducer(departmentReducer, initialState);

  const getDeartment = async (keyword,sortBy,orderby) => {
    let params = {};
    if (sortBy) params.sortby = sortBy;
    if (orderby) params.orderby = orderby;
    if (keyword) params.keyword = keyword;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params,
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
      if (res.data.success) {
        toast({
          title: "Department created.",
          description: "You have created a new Department.",
          status: "success",
          position: "top-right",
          duration: 1500,
          isClosable: true,
        });
        getDeartment();
      }      
      
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        position: "top-right",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const updateDeparment = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put('/api/v1/department', formData, config);
      if (res.data.success) {
        toast({
          title: "Department created.",
          description: "You have created a new Department.",
          status: "success",
          position: "top-right",
          duration: 1500,
          isClosable: true,
        });
        getDeartment();
      }      
      
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        position: "top-right",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const deleteDeparment = async (_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { _id }
    };

    try {
      const res = await axios.delete('/api/v1/department', config);

      if(res.data.success) {
        toast({
          title: "Department Deleted.",
          description: "You have successfully deleted the Department.",
          status: "success",
          position: "top-right",
          duration: 1500,
          isClosable: true,
        });
        getDeartment();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          position: "top-right",
          duration: 1500,
          isClosable: true,
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  const getTicketOfDeparment = async (_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {_id}
    };

    try {
       const result = await axios.get('/api/v1/department/ticket/',config);
       dispatch({
        type: GET_TICKET_OF_DEPARTMENTS,
        payload: result.data.tickets,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <departmentContext.Provider
      value={{
        depatments: state.depatments,
        tickets: state.tickets,
        addDeparment,
        getDeartment,
        deleteDeparment,
        updateDeparment,
        getTicketOfDeparment,
      }}
    >
      {props.children}
    </departmentContext.Provider>
  );
};

export default DepartmentState;
