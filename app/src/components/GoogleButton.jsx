import React from "react";
import { GoogleLogin } from "react-google-login";
import "firebase/database";
import { gToken } from "../utils/secrets"
const firebase = require("firebase");
 
class GoogleButton extends React.Component {
  constructor(props){
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  responseGoogle = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider)
    .then( res => {
      const userInfo = { name: res.user.displayName, email: res.user.email, oAuth: "google", picture: res.user.photoURL }
      this.props.getUser(userInfo)
    })
  }
  
  render(){
    return (
      <GoogleLogin
      clientId={gToken}
      buttonText="Google"
      ux_mode="redirect"
      redirectUri="/home"
      accessType="online"
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      />
      )
  }
}


export default GoogleButton