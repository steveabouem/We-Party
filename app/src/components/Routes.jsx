import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import HomePage from "./searchPage/HomePage.jsx";
import Activities from "./activities";
import PageNotFound from "./PageNotFound";
import LinkFulfill from "./login/LinkFulfill";
import Registration from "../components/login/RegisterPage";
import PaymentsPage from "../components/stripe/PaymentsPage";


class Routes extends React.Component {
  render () {
    return (
      <main id = "MainContainer">
        <Switch>
          <Route exact path ="/" component = {LandingPage} />
          <Route exact path = "/activities" component = {Activities} />
          <Route exact path = "/home" component = {HomePage} />
          <Route path = "/fulfill/:username" component = {LinkFulfill} />
          <Route path = "/register" component = {Registration} />
          <Route path = "/payment" component = {PaymentsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    )
  }
}
export default Routes