import React, { useReducer } from "react";
import { EDIT_TICKET, GET_TICKETS } from "./types";
import ticketContext from "./ticketContext";
import TicketReducer from "./ticketReducer";
import axios from "axios";

const TicketState = (props) => {
  const initialState = {
    tickets: [],
    loading: false,
    sucess: false,
    loadedTicket: null,
  };

  const [state, dispatch] = useReducer(TicketReducer, initialState);

  const getAllTickets = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/v1/ticket/get-all-tickets/", config);

      dispatch({
        type: GET_TICKETS,
        payload: res.data.tickets,
      });
    } catch (error) {}
  };

  const getTicketMsg = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/api/v1/ticket/get-all-tickets/", config);

      console.log(res.data.tickets);

      dispatch({
        type: GET_TICKETS,
        payload: res.data.tickets,
      });
    } catch (error) {}
  };

  const updateTickets = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2MjE4NWE3YTZkMzc4NDhhYjBjYSIsImlhdCI6MTYyOTcwODgyNSwiZXhwIjoxNjMyMzAwODI1fQ.xdYmAzhKie72IrzkAH-zBw8rEy24FPx-AGSgkGiJd5g",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/ticket/update-ticket/",
        formData,
        config
      );

      dispatch({
        type: EDIT_TICKET,
        payload: res.data.tickets,
      });
    } catch (error) {}
  };

  return (
    <ticketContext.Provider
      value={{
        tickets: state.tickets,
        loadedTicket: state.loadedTicket,
        getAllTickets,
        updateTickets,
        loading: state.loading,
        sucess: state.sucess,
      }}
    >
      {props.children}
    </ticketContext.Provider>
  );
};

export default TicketState;
