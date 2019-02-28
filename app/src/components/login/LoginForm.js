import React from 'react';

class LoginForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
  };

  saveUser = async() => {
    let first = this.state.firstName,
    last = this.state.lastName,
    email = this.state.email,
    password = this.state.password,
    userInfo = { displayName: `${first} ${last}`, email: email, oAuth: "Form", password:password};
    
    await this.props.createAuthUser(userInfo);
    await this.props.saveUser(userInfo);
  }

  render() {
    return (
      <form className="login-form">
        <label>
      	  Username
        </label>
        <input type="email" placeholder="@" />
        <label>
      	  Email
        </label>
        <input type="email" placeholder="@" />
        <label>
      	  Password
        </label>
        <input type="password" placeholder="***" />
        <label>
      	  Confirm Password
        </label>
        <input type="password" placeholder="***" />
        <button className="button-primary" onClick={() => this.saveUser()}>
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;

