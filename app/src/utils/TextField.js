import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dropdown from '../utils/Dropdown';

var debounce = require('debounce');

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    amount: '',
    people: '',
  };
  
  handleChange = name => event => {
    const button = event.target;
    console.log(button.id);
    (
      button.id === "budget-dropdown"?
      this.setState({
        [name]: event.target.value += "0",
      })
      :
      this.setState({
        [name]: event.target.value ,
      })
    )
  };
  
  render() {
    const { ...classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off" id="search-activity-form">
        <TextField
        id="clubs-search"
        label="Clubs?"
        type="search"
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          autoFocus: true,
        }}
        onChange={(evt)=>this.props.recordSearch(evt)}
        />
        <div className="sarch-separator" />
        <TextField
        id="restaurants-search"
        label="Restaurants"
        type="search"
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          autoFocus: true,
        }} 
        onChange={(evt)=>this.props.recordSearch(evt)}
        />
        <div className="sarch-separator" />
        <TextField
        id="how-many"
        label="How many?"
        value={this.state.people}
        onChange={this.handleChange('people')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        />
        <div className="sarch-separator" />
        <Dropdown />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
