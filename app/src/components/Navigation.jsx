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
      userStatus: null
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
   async getUser(){
    if (store.getState().userInfo.user.loggedIn)
      return store.getState().userInfo.user.loggedIn
  }
  async componentWillMount(){
    await store.getState().userInfo.user.loggedIn;
    this.setState({userStatus: store.getState().userInfo.user.loggedIn});
    console.log(store.getState().userInfo.user.loggedIn);
  }
  
  render () {
    this.getUser()
    return (
      this.state.userStatus?
      <div className="navigation">
        <nav>
          <a className="navbar-brand" href="/home"> We-Party </a>
          <a href="/tour"> Tour </a>
          <a href="/groups"> Groups </a>
          <a href="/activities"> Activities </a>
          <a href="/authenticate" id="login"> Login/Register </a>
          <span className="user-info">
            {store.getState().userInfo.user.loggedIn} 
          </span>
        </nav>
      </div>
      : <div className="navigation">
      <nav>
        <a className="navbar-brand" href="/home"> We-Party </a>
        <a href="/tour"> Tour </a>
        <a href="/groups"> Groups </a>
        <a href="/activities"> Activities </a>
        <a href="/authenticate" id="login"> Login/Register </a>
        <span className="user-info">
          Guest
        </span>
      </nav>
    </div>
    )
  }
}

export default Navigation