import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ConfirmButton from '../ConfirmButton/ConfirmButton';


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 16
    },
    button: {
      margin: theme.spacing.unit,
    },

});

const initState = {
    title: undefined,
    description: undefined,
    price: undefined,
    date: undefined,
    formErrors: {
        titleError: undefined,
        descriptionError: undefined,
        priceError: undefined,
        dateError: undefined
    },
};

class EventForm extends Component {

    constructor(props) {
        super(props);
        this.formEl = React.createRef();
        this.state = initState;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    formValidation = () => {

        const { title, description, price, date } = this.state;
        let formErrors = {};
        let formIsValid = true;
        
        if (!title) {
          formIsValid = false;
          formErrors['titleError'] = 'You must provide an event title.';
        }

        if (!description) {
          formIsValid = false;
          formErrors['descriptionError'] = 'You must provide an event description.';
        }
  
        if (!price) {
          formIsValid = false;
          formErrors['priceError'] = 'You must provide an event price.';
        }
  
        if (price) {
          if (isNaN(price)) {
            formIsValid = false;
            formErrors['priceError'] = 'Please enter a valid price number.';
          }
        }
  
        if (!date) {
          formIsValid = false;
          formErrors['dateError'] = 'You must provide a date for the event.';
        }
  
        // if (date) {
        //   if (!date.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //     formIsValid = false;
        //     formErrors['dateError'] = 'Please enter a secure and strong date.';
        //   }
        // }
  
        this.setState({ formErrors });

        return formIsValid;
    }
  
    onSubmit = e => {
        e.preventDefault();
        if (this.formValidation()) {
            const { title, description, price, date } = this.state;
            this.props.onSubmit({
                title,
                description,
                price,
                date
            });
            this.formEl.current.reset();
        }
    }


    renderButtons = () => {
        const { classes, onCancel } = this.props;

        return  [
            <ConfirmButton
                type="submit"
                key="submit"
                variant="contained" 
                color="primary"
                className={classes.button}
                disabled={this.state.isValid}>
                    Submit
            </ConfirmButton>,
            <Button
                key="cancel"
                variant="contained" 
                color="secondary"
                className={classes.button}
                onClick={onCancel}>
                    Cancel
            </Button>
        ];
    };
    
    render() {
        const { classes } = this.props;
        const { titleError, descriptionError, dateError, priceError  } = this.state.formErrors;

        return (    
            <form
                ref={this.formEl}
                className={classes.container}
                autoComplete="off"
                onSubmit={this.onSubmit}
                noValidate>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            error={!!titleError}
                            type="text"
                            name="title"
                            autoComplete="title"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ titleError ? titleError : '' }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            error={!!descriptionError}
                            multiline
                            rows="4"
                            name="description"
                            autoComplete="description"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ descriptionError ? descriptionError : '' }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!dateError}
                            type="datetime-local"
                            name="date"
                            autoComplete="date"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ dateError ? dateError : '' }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="price"
                            error={!!priceError}
                            type="number"
                            name="price"
                            autoComplete="price"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            helperText={ priceError ? priceError : '' }
                        />
                    </Grid>
                    <Grid item 
                            xs={12}
                            container
                            justify="flex-end">
                        { this.renderButtons() }
                    </Grid>
                </Grid>
            </form>
        );
    }
}

EventForm.propTypes = {
    classes: PropTypes.object,
    formType: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

export default withStyles(styles)(EventForm);