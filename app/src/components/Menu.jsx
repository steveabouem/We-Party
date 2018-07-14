import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MenuButton extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <span
        id="menu-button"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{color: "#FFD951"}}
        >
         Menu
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
           <a href="/activities">My Activities</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a href="/groups">My Groups</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a href="/budget">My Budget</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a href="/tour">Tour</a>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
