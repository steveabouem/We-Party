import React from "react";
import { userSession } from "../actions/index";
import { connect } from "react-redux";

class LoginPage extends React.Component {
  onClick = function onClick(e){
  e.preventDefault()
    this.props.userSession();
  }
  render(){
    console.log("Props: ", this.props);
    return(
      <div className="login-page">
        <form>
         Enter smth:
          <textarea/>
          <button type="SUBMIT" onClick={this.onClick}>
            Send
          </button>
        </form>
      </div>
    )
  }
}
export default connect(null, { userSession })(LoginPage);
