import { ADD_TICKET, GET_TICKETS, IS_LOADING } from './types';

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

    default:
      break;
  }
};

export default CustomerReducer;
