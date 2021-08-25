import { ADD_DEPARTMENT, GET_DEPARTMENTS } from './actions';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT:
      state.depatments.push(action.payload);
      return {
        ...state,
        depatments: [...state.depatments],
      };
    case GET_DEPARTMENTS:
      return {
        ...state,
        depatments: [...action.payload],
      };
    default:
      return state;
  }
};

export default CustomerReducer;
