import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import Root from "./components/Rootcomponent.jsx";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();