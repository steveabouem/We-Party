import React from "react";
import { Link } from "react-router-dom";


class HomePage extends React.Component {
  
  render(){
    return( 
        <div className="landing-page">
        <div className="slider-divs"/>
        <div className="slider-divs"/>
        <div className="slider-divs"/>
        <div className="white-box">
              <h1> We-Party </h1>
              <p className="tagline"> Our goal? Allow people to organise group activities on one single platform.
                  Location? Prices? Suggestions? We got you covered!
              </p>
              <p>
                  Get started <Link to="/authenticate"> here </Link>. 
              </p>
        </div>
      </div>
    )
  }
}

export default HomePage