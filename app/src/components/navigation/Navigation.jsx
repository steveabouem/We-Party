import React from "react";
import {connect} from "react-redux";
import {logout} from "../../actions";
import NavDropDown from "./NavDropDown";
const firebase = require("firebase");

class Navigation extends React.Component {
  constructor () {
    super();
    this.state = {
      isMenuOpen: false,
      username: '',
    };
    firebase.auth().onAuthStateChanged(currentUser => {
          this.setState({ 
              currentUser: currentUser,
           });
    });
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  renderUsername = () => {
    let {userInfo} = this.props;
    if(firebase.auth().currentUser && userInfo.userSummary){
      return userInfo.userSummary.displayName;
    } else if(firebase.auth().currentUser && !userInfo.userSummary){
      return firebase.auth().currentUser.displayName;
    } else {
      return "Guest";
    }
  };

  logout = async() => {
    await this.props.logout();
  };

  render() {
    return (
      <div className="navigation-container">
        <div className="navigation-left">
          <span>
            WeParty!
          </span>
        </div>
        <div className="navigation-right">
          <span className="material-icons" id={"user-icon" + (firebase.auth().currentUser ? "-active" : "")}>face</span>
          <span className="user-name">
              {this.renderUsername()}
          </span>
          <a className="menu-toggle" onClick={this.toggleMenu}>
            <span className="material-icons">
              menu
            </span>
          </a>
          { this.state.isMenuOpen 
            &&
            <NavDropDown 
              toggleMenu={this.toggleMenu} 
              isMenuOpen={this.state.isMenuOpen} 
              logout={this.logout}
              currentUser={firebase.auth().currentUser}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps, {logout}) (Navigation) 