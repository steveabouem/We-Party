import { LOGIN, SEARCH_VENUE, LOAD_USERS, RETRIEVEMATCH, SAVE_VENUE, LOAD_ACTIVITIES } from "../actions/types";

const initialState = {
  userInfo:{userInfo:{name:"Guest"} }
}

export default function(state = initialState, action){
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
    case SAVE_VENUE: {
      return {
        ...state,
        activitiesList: [...action.payload]
      }
      console.log("reducer", state);
      
    };
    case LOAD_USERS:
    return{
      ...state,
      usersList: action.payload
    };
    case LOAD_ACTIVITIES: {
      return{
        ...state,
        activitiesList: action.payload
      }
    }
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