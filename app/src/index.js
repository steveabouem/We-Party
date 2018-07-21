import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import Root from "./components/Rootcomponent.jsx";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();