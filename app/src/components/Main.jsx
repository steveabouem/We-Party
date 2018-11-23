import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import HomePage from "./HomePage.jsx";
import Tour from "./Tour.jsx";
import Groups from "./Groups.jsx";
import Activities from "./Activities.jsx";


class Main extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route exact path ="/" component = {LandingPage} />
          <Route exact path = "/activities" component = {Activities} />
          <Route exact path = "/authenticate" component = {LoginPage} />
          {/* <Route exact path = "/groups" commponent = {Groups} /> */}
          <Route exact path = "/home" component = {HomePage} />
          {/* <Route exact path = "/tour" component = { Tour } /> */}
          {/* <Route path = "/budget" commponent = {Budget} /> */}
        </Switch>
      </main>
    )
  }
}
export default Main