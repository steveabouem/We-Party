import React from "react";
import Navigation from "./Navigation.jsx";

class Budget extends React.Component {
  render(){
    return(
      <div className="budget-page">
        <Navigation />
        <h1> Budget page, use cards :)</h1>
      </div>
    )
  }
}
export default Budget