import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dropdown from './Dropdown';
import GenderMix from "./GenderMix";

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
    name: '',
    amount: '',
    people: '',
  };
  
  handleChange = name => event => {
    const button = event.target;
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
        id="SEARCH_VENUE"
        label="Where/What?"
        type="search"
        className={classes.textField}
        margin="normal"
        InputLabelProps={{
          autoFocus: true,
        }}
        />
        <div className="sarch-separator" />
        
        <TextField
        id="how-many"
        label="How many? (only digits)"
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
        <div className="sarch-separator" />
        <GenderMix />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
