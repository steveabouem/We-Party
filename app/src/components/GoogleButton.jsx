import React from "react";
import { GoogleLogin } from "react-google-login";
import firebase from "firebase/app";
import "firebase/database";
import { dbConfig } from "../config/firebase";

 
class GoogleButton extends React.Component {
  constructor(props){
    super(props)
    this.app = firebase.initializeApp(dbConfig);
    this.database = this.app.database().ref().child('users');
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  responseGoogle = (response) => {
    const userInfo = response.profileObj;
    this.props.getUser(userInfo);
    this.database.push().set({ firstName: userInfo.givenName, lastName: userInfo.familyName });
  }
  render(){
    console.log("button props", this.props)
    return (
      <GoogleLogin
      clientId="489475258388-c3lsm1ejc3csalbl5vmfdamaahous9sf.apps.googleusercontent.com"
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