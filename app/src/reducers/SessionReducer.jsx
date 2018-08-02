import { LOGIN, LOGOUT, SEARCH_ACTIVITIES } from "../actions/types";

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
    case SEARCH_ACTIVITIES:{
      return{
        ...state,
        searchResults:[...action.payload]
      }
    };
    default:
    return state;
      }
}