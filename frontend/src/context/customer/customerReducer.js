import { ADD_TICKET, GET_TICKETS } from './types';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
      };

    default:
      break;
  }
};

export default CustomerReducer;
