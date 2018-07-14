import React from "react";
import Navigation from "./Navigation.jsx";


class HomePage extends React.Component {
  render(){
    return( 
      <div className="landing-page">
        <div className="white-box">
              <h1> We-Party </h1>
              <p> Our goal? Allow people to organise group activities on one single platform.
                  Location? Prices? Suggestions? We got you covered!
              </p>
              <p>
                  Get started <a href="/authenticate"> here </a>. 
              </p>
        </div>
      </div>
    )
  }
}

export default HomePage