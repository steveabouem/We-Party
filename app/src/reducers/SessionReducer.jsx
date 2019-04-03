import { LOGIN, USER_SUMMARY, SEARCH_VENUE, LOAD_USERS, SAVE_VENUE, LOAD_ACTIVITIES, RENDER_JOINED, ERROR, OPEN_CHAT, MSG_HISTORY, NEW_MSG } from "../actions/types";

const initialState = {
  userInfo:{userInfo:{name:"Guest"} },
  joinedList: [],
  error: null,
  activitiesList: [],
  messages: []
}

export default function(state = initialState, action){
  
  switch (action.type) {
    case LOGIN:
    return {
      ...state,
      userInfo: action.payload
    }
    
    case USER_SUMMARY:
    return {
      ...state,
      userSummary: action.payload
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
        activitiesList: [...state.activitiesList, action.payload]
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
        joinedList: [...state.joinedList, action.payload]
      }
    }

    case LOAD_ACTIVITIES: {
      state
      return {
        ...state,
        activitiesList: action.payload
      }
    }
    case OPEN_CHAT: {
      return {
        ...state,
        chatInfo: action.payload
      }
    }
    case MSG_HISTORY: {
      return {
        ...state,
        messages: [...state.messages,action.payload] 
      }
    }

    case NEW_MSG: {
      return { 
        ...state,
        messages: [...state.messages,action.payload]
      }
    }
    case ERROR: {
      return {
        ...state,
        ErrorMessage: action.payload
      }
    }
    
    default:
    return state;
  }
}