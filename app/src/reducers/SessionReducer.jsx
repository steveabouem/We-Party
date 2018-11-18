import { LOGIN, LOGGED_IN, SEARCH_VENUE, LOAD_USERS, SAVE_VENUE, LOAD_ACTIVITIES, RENDER_JOINED } from "../actions/types";

const initialState = {
  userInfo:{userInfo:{name:"Guest"} }
}

export default function(state = initialState, action){
  switch (action.type) {
    case LOGIN:
    return {
      ...state,
      userInfo: action.payload
    }
    
    case LOGGED_IN:
    return {
      ...state,
      loggedIN: action.payload
    }
    
    case SEARCH_VENUE:{
      return {
        ...state,
        searchResults:action.payload
      }
    }
    
    case SAVE_VENUE: {
      return {
        ...state,
        activitiesList: [...action.payload]
      }
    }
    
    case LOAD_USERS: {
      return {
        ...state,
        usersList: action.payload
      }
    }
    
    case RENDER_JOINED: {
      return {
        ...state,
        joinedList: action.payload
      }
    }

    case LOAD_ACTIVITIES: {
      return {
        ...state,
        activitiesList: action.payload
      }
    }
    
    default:
    return state;
  }
}