import React from 'react';
import { fbToken } from "../../utils/secrets"
import "firebase/database";
const firebase = require("firebase");
 
class FacebookButton extends React.Component {
  login = async () => {
    var provider = new firebase.auth.TwitterAuthProvider();;
    firebase.auth().signInWithPopup(provider)
    .then( res => {
      this.props.history.push("/home");
    })
    .catch( e => {
      console.log("Google login error", e);
    });
  }
  render(){
    return(
    <button onClick={this.login}>
      TWITTER
    </button>
    )
  }
}

export default FacebookButton