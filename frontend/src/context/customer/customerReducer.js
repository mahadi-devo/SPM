import {
  ADD_TICKET,
  GET_TICKETS,
  IS_LOADING,
  VIEW_TICKET,
  REMOVE_LOADED,
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

    default:
      break;
  }
};

export default CustomerReducer;
