import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  userId:{}
}

export default function(state = initialState, action){
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload
      };
    default:
    return state;
      }
}