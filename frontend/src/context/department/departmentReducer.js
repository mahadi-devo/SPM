import { ADD_DEPARTMENT, GET_DEPARTMENTS } from './actions';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ADD_DEPARTMENT:
      return {
        ...state,
        depatments: [...state.depatments],
      };
    case GET_DEPARTMENTS:
      console.log("🚀 ~ file: departmentReducer.js ~ line 15 ~ CustomerReducer ~ depatments")
      return {
        ...state,
        depatments: [...action.payload],
      };
    default:
      return state;
  }
};

export default CustomerReducer;
