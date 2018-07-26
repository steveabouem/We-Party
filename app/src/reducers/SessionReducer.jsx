import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  userInfo:{userInfo:{givenName:"Guest"} }
}

export default function(state = initialState, action){
  if(action.payload)
  console.log("reducer login payload:",  action.payload)
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
    return state;
      }
}