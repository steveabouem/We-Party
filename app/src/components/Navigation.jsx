import React from "react";
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import store from "../store";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      userStatus: "test"
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

   componentWillMount(){
    if(store.getState().userInfo.user.loggedIn)
    this.state.userStatus = store.getState().userInfo.user.loggedIn
    console.log(store.getState().userInfo.user)

  }
  
  render () {
    return (
      <div className="navigation">
        <nav>
          <a className="navbar-brand" href="/home"> WeParty! </a>
          <a href="/tour"> Tour </a>
          <a href="/groups"> Groups </a>
          <a href="/activities"> Activities </a>
          <a href="/authenticate" id="login"> Login/Register </a>
          <span className="user-info">
            {this.state.userStatus}
          </span>
        </nav>
      </div>
    )
  }
}

export default Navigation