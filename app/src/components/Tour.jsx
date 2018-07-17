import React from "react";
import Navigation from "./Navigation.jsx";

class Tour extends React.Component {
  render(){
    return(
    <div className="tour">
    <Navigation/>
      <h1> Take the tour on this page. </h1>
      <p> Use a slidshow animation with stills of navigation and have 
        them interactive. Don't forget the skip button. Make it full scree so no Navbar.
      </p>
    </div>
    )
  }
}

export default Tour