import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { fbToken } from "../../utils/secrets"
import "firebase/database";

// const firebase = require("firebase");
 
class FacebookButton extends React.Component {
  responseFacebook = async () => {
    // var provider = new firebase.auth.FacebookAuthProvider();
    // await firebase.auth().signInWithPopup(provider)
    // .then( res => {
    //   console.log(res.user);
      // const userInfo = { name: res.user.displayName, email: res.user.email, oAuth: "google", picture: res.user.photoURL }
      // console.log(userInfo);
      
      // this.props.getUser(userInfo)
    // });
  }
  
  render(){
    return(
    <FacebookLogin
      appId={fbToken}
      autoLoad={true}
      fields="name,email,picture"
      textButton="Facebook"
      callback={null} />
    )
  }
}

export default FacebookButton