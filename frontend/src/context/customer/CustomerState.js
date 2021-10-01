import React, { useReducer } from 'react';
import {
  ADD_TICKET,
  GET_TICKETS,
  IS_LOADING,
  VIEW_TICKET,
  REMOVE_LOADED,
  CLEAR_FILTER,
  DELETE_TICKET,
  FILTER_TICKETS,
} from './types';
import customerContext from './customerContext';
import CustomerReducer from './customerReducer';
import axios from 'axios';
import config from '../../utils/config';

const CustomerState = (props) => {
  const initialState = {
    tickets: [],
    loading: false,
    sucess: false,
    loadedTicket: null,
    deleteSucess: false,
    filtered: null,
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const addTicket = async (ticket) => {
    dispatch({
      type: IS_LOADING,
    });

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

  const deleteTicket = async (id) => {
    console.log(id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTA3YjBkMzdkMDE5MWVkMGEyZDFkMiIsImlhdCI6MTYzMjY2NDMzMywiZXhwIjoxNjM1MjU2MzMzfQ.X4XWUMru-SG28S1Di5TLnL0mgDT0OBo_npOxACf0Xts',
      },
    };

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/ticket/${id}`,
        config
      );

      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });

      getTickets();
    } catch (error) {}
  };

  const closeTicket = async (ticket, type) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/ticket/status/${ticket._id}`,
        { type },
        config
      );

      getTickets();
      getviewTicket(ticket._id);
    } catch (error) {}
  };

  const filterTickets = (text) => {
    dispatch({ type: FILTER_TICKETS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <customerContext.Provider
      value={{
        tickets: state.tickets,
        loadedTicket: state.loadedTicket,
        filtered: state.filtered,
        addTicket,
        getTickets,
        getviewTicket,
        removeLoaded,
        deleteTicket,
        closeTicket,
        filterTickets,
        clearFilter,
        loading: state.loading,
        sucess: state.sucess,
      }}>
      {props.children}
    </customerContext.Provider>
  );
};

export default CustomerState;
