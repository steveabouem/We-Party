import { LOGIN, SEARCH_VENUE, LOAD_USERS, RETRIEVEMATCH } from "../actions/types";

const initialState = {
  userInfo:{userInfo:{name:"Guest"} },
}

export default function(state = initialState, action){
  // if(action.payload) for some reason it breaks the app? makes no sense yet
  switch (action.type) {
    case LOGIN:
    return {
      ...state,
      userInfo: action.payload
    };
    case SEARCH_VENUE:{
      return{
        ...state,
        searchResults:action.payload
      }
    };
    case LOAD_USERS:
    return{
      ...state,
      usersList: action.payload
    };
    case RETRIEVEMATCH:{
      return {
        ...state,
        matchingActivities: action.payload
      }
    }
    default:
    return state;
  }
}