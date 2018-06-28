import React from "react";
import Navigation from "./Navigation.jsx";

export default class HomePage extends React.Component {
  render (){
    return(
      <div className="home-page">
        <Navigation />
        <h1> home page </h1>
      </div>
    )
  }
}

