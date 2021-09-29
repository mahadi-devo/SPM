import {
  FILTER_TICKETS,
  ADD_TICKET,
  GET_TICKETS,
  IS_LOADING,
  VIEW_TICKET,
  REMOVE_LOADED,
  DELETE_TICKET,
  CLEAR_FILTER,
} from './types';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        loading: false,
        sucess: true,
      };

    case IS_LOADING:
      return {
        ...state,
        loading: true,
        sucess: false,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };

    case VIEW_TICKET:
      return {
        ...state,
        loadedTicket: action.payload,
      };

    case REMOVE_LOADED:
      return {
        ...state,
        loadedTicket: null,
      };

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload
        ),
        deleteSucess: true,
      };

    case FILTER_TICKETS:
      return {
        ...state,
        filtered: state.tickets.filter((ticket) => {
          const regex = RegExp(`${action.payload}`, 'gi');

          return (
            ticket.name.match(regex) ||
            ticket.email.match(regex) ||
            ticket.subject.match(regex)
          );
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    default:
      break;
  }
};

export default CustomerReducer;
