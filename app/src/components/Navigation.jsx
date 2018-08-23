import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MenuButton from "./Menu.jsx";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navigation(props) {
  console.log(props);
  
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuButton items={[{ref: "/activities", name:"My Activities"}, {ref: "/groups", name:"My Groups"}, {ref: "/budget", name:"My Budget"}, {ref: "/tour", name:"Tour"}]} button={"WeParty"}/>
          </IconButton>
          <span style={{position: "absolute", right: "1%"}}>
            <span className="display-name" style={{padding: "1em"}}> {(props.userInfo.userInfo.userInfo? "Guest" : props.userInfo.userInfo.name)}</span>
            <a href="/authenticate" className="link-primary" style={{padding: "0.5em"}}>Login</a>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  userInfo: state.userInfo
})
export default connect(mapStateToProps) (withStyles(styles)(Navigation));
