import { ADD_DEPARTMENT, GET_DEPARTMENTS, GET_TICKET_OF_DEPARTMENTS } from './actions';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT:
      return {
        ...state,
        depatments: [...state.depatments],
      };
    case GET_DEPARTMENTS:
      return {
        ...state,
        depatments: [...action.payload],
      };
    case GET_TICKET_OF_DEPARTMENTS:
      return {
        ...state,
        tickets: [...action.payload],
      };
    default:
      return state;
  }
};

export default CustomerReducer;
