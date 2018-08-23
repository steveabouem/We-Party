import React from "react";
import { GoogleLogin } from "react-google-login";
import "firebase/database";
import { gToken } from "../utils/secrets"

 
class GoogleButton extends React.Component {
  constructor(props){
    super(props)
    // this.app = firebase.initializeApp(dbConfig);
    // this.database = this.app.database().ref().child('users');
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  responseGoogle = (response) => {
    const userInfo = response.profileObj;
    this.props.getUser(userInfo);
    this.database.push().set({ firstName: userInfo.givenName, lastName: userInfo.familyName });
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