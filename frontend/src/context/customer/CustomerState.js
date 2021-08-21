import React, { useReducer } from 'react';
import { ADD_TICKET, GET_TICKETS } from './types';
import customerContext from './customerContext';
import CustomerReducer from './customerReducer';

const CustomerState = (props) => {
  const initialState = {
    tickets: [],
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const addTicket = (ticket) => {
    console.log(ticket);
  };

  return (
    <customerContext.Provider
      value={{
        tickets: state.tickets,
        addTicket,
      }}>
      {props.children}
    </customerContext.Provider>
  );
};

export default CustomerState;
