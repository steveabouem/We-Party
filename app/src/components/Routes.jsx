import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import HomePage from "./searchPage/HomePage.jsx";
import Activities from "./activities";


class Routes extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route exact path ="/" component = {LandingPage} />
          <Route exact path = "/activities" component = {Activities} />
          <Route exact path = "/home" component = {HomePage} />
        </Switch>
      </main>
    )
  }
}
export default Routes