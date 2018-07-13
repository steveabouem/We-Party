import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import HomePage from "./HomePage.jsx";
import Tour from "./Tour.jsx";
import Groups from "./Groups.jsx";


class Main extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route exact path ="/" component = {LandingPage} />
          <Route path = "/home" component = {HomePage} />
          <Route path = "/authenticate" component = {LoginPage} />
          <Route path = "/tour" component = { Tour } />
          <Route path = "/groups" commponent = {Groups} />
        </Switch>
      </main>
    )
  }
}
export default Main