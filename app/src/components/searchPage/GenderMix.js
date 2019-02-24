import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Gender extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: "Edit your group"
    };
  }
  

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  async selectItem(selection){
    this.setState({dropDownValue: selection })
  }


  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Group
        </DropdownToggle>
        <DropdownMenu id="gender-mix">
          <DropdownItem onClick={() => this.selectItem("Boyz Night Out")}>
            BOYS
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Girls Night Out")}>
            GIRLS
          </DropdownItem>
          <DropdownItem onClick={() => this.selectItem("Mixed")}>
            MIXED
          </DropdownItem>
        </DropdownMenu>
        <p id="gender-selected">{this.state.dropDownValue}</p>
      </Dropdown>
    );
  }
}