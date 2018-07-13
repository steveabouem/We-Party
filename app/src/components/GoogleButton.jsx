import React from 'react';
import { GoogleLogin } from 'react-google-login';

 
class GoogleButton extends React.Component {
  responseGoogle = (response) => {
    console.log(response);
  }
  
  render(){
    return (
      <GoogleLogin
      clientId="489475258388-c3lsm1ejc3csalbl5vmfdamaahous9sf.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      />
      )
  }
}

export default GoogleButton