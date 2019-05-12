import React from "react";
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx";
import HomePage from "./searchPage/HomePage.jsx";
import Activities from "./activities";
import PageNotFound from "./PageNotFound";
import LinkFulfill from "./login/LinkFulfill";
import Registration from "../components/login/RegisterPage";
import PaymentsPage from "../components/stripe/PaymentsPage";
import ProfilePage from "./profile/ProfilePage";
import SearchResult from "./result/SearchResult";

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
          <Route path = "/profile" component = {ProfilePage} />
          {/* maybe a name like venue details or smth */}
          <Route exact path = "/result/:id" component = {SearchResult} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    )
  }
}
export default Routes