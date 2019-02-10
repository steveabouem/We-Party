import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: "Pitch in"
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  async selectItem(amt){
    this.setState({dropDownValue:`${amt}CAD`})
  }

  customizeItem() {
    return
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          $
        </DropdownToggle>
        <DropdownMenu id="dropdown">
          <DropdownItem onClick={ () => this.selectItem(10)}>10CAD</DropdownItem>
          <DropdownItem onClick={() => this.selectItem(20)}>20CAD</DropdownItem>
          <DropdownItem onClick={() => this.selectItem(30)}>30CAD</DropdownItem>
          <DropdownItem onClick={() => this.selectItem(40)}>40CAD</DropdownItem>
          <DropdownItem onClick={() => this.selectItem(50)}>50CAD</DropdownItem>
          <DropdownItem onClick={() => this.selectItem(100)}>100CAD</DropdownItem>
        </DropdownMenu>
        <p id="budget-selected">{this.state.dropDownValue}</p>
      </Dropdown>
    );
  }
}