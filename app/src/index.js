import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import Root from "./components/Rootcomponent.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./styles/activities.css";
import "./styles/navigation.css";
import "./styles/home.css";
import "./styles/animations.css";
import "./styles/login.css";
import "./styles/landing.css";
import "./styles/modals.css";
import "./styles/chat.css";

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();