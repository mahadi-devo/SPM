import { ADD_USER, GET_USER } from './types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };

    default:
      break;
  }
};

export default UserReducer;
