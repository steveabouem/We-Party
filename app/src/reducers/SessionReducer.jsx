import { LOGIN, SEARCH_CLUBS, LOAD_USERS, SEARCH_RESTAURANTS, RETRIEVEMATCH } from "../actions/types";

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
    case SEARCH_CLUBS:{
      return{
        ...state,
        searchResults:action.payload
      }
    };
    case SEARCH_RESTAURANTS:{
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