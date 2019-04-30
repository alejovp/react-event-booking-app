import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    root: {
      backgroundColor: theme.palette.confirm.main,
      '&:hover': {
        backgroundColor: theme.palette.confirm.secondary,
      },
      '&:active': {
        backgroundColor: theme.palette.confirm.secondary,
      },
    },
});

const ConfirmButton = props => (
    <Button
        classes={{ root: props.classes.root }}
        {...props} />
);

ConfirmButton.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(ConfirmButton);