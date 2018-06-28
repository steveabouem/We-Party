import React from "react";

class HomePage extends React.Component {
  render(){
    return( 
      <div className="landing-page">
        <div className="white-box">
          <h1> WeParty </h1>
          <p> Our goal? Allow people to organise group activities on one single platform
              Location? Prices? Suggestions? We got you covered!
              Take a <a> tour </a>? 
          </p>
        </div>
      </div>
    )
  }
}

export default HomePage