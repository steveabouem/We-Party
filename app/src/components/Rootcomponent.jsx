import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App.jsx";
import { CookiesProvider } from 'react-cookie';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <CookiesProvider>
        <Route path="/:filter?" component={App} />
      </CookiesProvider>
    </Router>
  </Provider>
);

export default Root