import React, { useReducer } from 'react';
import {
  ADD_TICKET,
  GET_TICKETS,
  IS_LOADING,
  VIEW_TICKET,
  REMOVE_LOADED,
} from './types';
import customerContext from './customerContext';
import CustomerReducer from './customerReducer';
import axios from 'axios';

const CustomerState = (props) => {
  const initialState = {
    tickets: [],
    loading: false,
    sucess: false,
    loadedTicket: null,
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const addTicket = async (ticket) => {
    dispatch({
      type: IS_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2MjE4NWE3YTZkMzc4NDhhYjBjYSIsImlhdCI6MTYyOTcwODgyNSwiZXhwIjoxNjMyMzAwODI1fQ.xdYmAzhKie72IrzkAH-zBw8rEy24FPx-AGSgkGiJd5g',
      },
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/ticket',
        ticket,
        config
      );

      dispatch({
        type: ADD_TICKET,
        payload: res.data.ticket,
      });
    } catch (error) {}
  };

  const getTickets = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2MjE4NWE3YTZkMzc4NDhhYjBjYSIsImlhdCI6MTYyOTcwODgyNSwiZXhwIjoxNjMyMzAwODI1fQ.xdYmAzhKie72IrzkAH-zBw8rEy24FPx-AGSgkGiJd5g',
      },
    };

    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/ticket',
        config
      );

      dispatch({
        type: GET_TICKETS,
        payload: res.data.tickets,
      });
    } catch (error) {}
  };

  const getviewTicket = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2MjE4NWE3YTZkMzc4NDhhYjBjYSIsImlhdCI6MTYyOTcwODgyNSwiZXhwIjoxNjMyMzAwODI1fQ.xdYmAzhKie72IrzkAH-zBw8rEy24FPx-AGSgkGiJd5g',
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/ticket/${id}`,
        config
      );

      console.log('state', res.data.data);

      dispatch({
        type: VIEW_TICKET,
        payload: res.data.data,
      });
    } catch (error) {}
  };

  const removeLoaded = () => {
    dispatch({
      type: REMOVE_LOADED,
    });
  };

  return (
    <customerContext.Provider
      value={{
        tickets: state.tickets,
        loadedTicket: state.loadedTicket,
        addTicket,
        getTickets,
        getviewTicket,
        removeLoaded,
        loading: state.loading,
        sucess: state.sucess,
      }}>
      {props.children}
    </customerContext.Provider>
  );
};

export default CustomerState;
