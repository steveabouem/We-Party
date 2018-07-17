import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import HomePage from "./HomePage.jsx";
import Tour from "./Tour.jsx";
import Groups from "./Groups.jsx";
import Budget from "./Budget.jsx";
import Activities from "./Activities.jsx";


class Main extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route path = "/home" component = {HomePage} />
          <Route path = "/activities" component = {Activities} />
          <Route path = "/authenticate" component = {LoginPage} />
          <Route exact path = "/groups" commponent = {Groups} />
          <Route path = "/tour" component = { Tour } />
          <Route path = "/budget" commponent = {Budget} />
          <Route exact path ="/" component = {LandingPage} />
        </Switch>
      </main>
    )
  }
}
export default Main