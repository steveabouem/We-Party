import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};//think of having a language property here, for when you start dev of french components
const middleware = [thunk];
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;