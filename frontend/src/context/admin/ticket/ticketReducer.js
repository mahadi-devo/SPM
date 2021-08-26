import { EDIT_TICKET, GET_TICKETS } from './types';

const TicketReducer = (state, action) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    default:
      return state;
  }
};

export default TicketReducer;
