import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundPositionY: "57%",
    backgroundImage: `url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b811266a4cf56733a98b08047ffe3ed&auto=format&fit=crop&w=1050&q=80")`,
    height: "100px",
    width: "80%",
    margin: "auto",
    marginTop: "1%"
  },
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
