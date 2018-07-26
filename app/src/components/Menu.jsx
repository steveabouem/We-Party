import React from 'react';
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
         {this.props.button}
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
         {this.props.items.map(item => {
           return (<MenuItem onClick={this.handleClose}>
            <a href={item.ref}>{item.name}</a>
           </MenuItem>)
         })} 
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
