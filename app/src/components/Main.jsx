import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import HomePage from "./HomePage.jsx";

class Main extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route exact path ="/" component = {LandingPage} />
          <Route path = "/home" component = {HomePage} />
          <Route path = "/login" component = {LoginPage} />
          {/* <Route path = "/tour" component = { TBD } /> */}
        </Switch>
      </main>
    )
  }
}
export default Main