import { ADD_USER, GET_USER, CHANGE_SUCESS } from './types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        sucess: true,
      };
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case CHANGE_SUCESS:
      return {
        sucess: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
