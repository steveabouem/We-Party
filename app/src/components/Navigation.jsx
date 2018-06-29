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

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
        </nav>
      </div>
    )
  }
}

export default Navigation