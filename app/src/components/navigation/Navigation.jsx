import React from "react";
import {connect} from "react-redux";
import {logout, updateUser} from "../../actions";
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

  setNewName = name => {
    this.setState({
      newUserName: name
    })
  };

  renderUsername = () => {
    if(firebase.auth().currentUser && firebase.auth().currentUser.displayName && !this.state.newUserName) {
      return firebase.auth().currentUser.displayName;
    } else if (firebase.auth().currentUser && !firebase.auth().currentUser.displayName && !this.state.newUserName) {
      return (
        <React.Fragment>
      <input 
        type="text" name="edit-name" maxLength={10} className="select-name"
        placeholder="choose a username (4 to 8)" 
      />
      <button type="button" className="submit-name" onClick={e => {this.updateUser(e)}}>
        Confirm
      </button>
    </React.Fragment>
      );
    } else if(this.state.newUserName){
      return this.state.newUserName ;
    } else {
      return "Guest";
    }
  };

  updateUser = async e => {
    e.preventDefault();
    let username = document.getElementsByName("edit-name")[0].value;
    if(this.state.currentUser.uid) {
      console.log("processing update on user profile");
      
      this.props.updateUser({uid: this.state.currentUser.uid, update: {displayName: username}}, () => {
        console.log("updating screen");
        return this.setNewName(username);
      });
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

export default connect(mapStateToProps, {logout, updateUser}) (Navigation) 