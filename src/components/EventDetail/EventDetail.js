import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    paper: {
        padding: 10,
        marginBottom: 2
    },
    creator: {
        right: 10
    },
    price: {
        fontSize: 15,
        right: 10
    }
};

const EventDetail = ({ event, classes }) => {
    const { title, description, date, price, creator } = event;
    
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle2" 
                    color="textSecondary"
                >
                    {date}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.creator}
                    variant="overline"
                    align="right"
                >
                    Creator: {creator.email}
                </Typography>
                <Typography 
                    component="p"
                    variant="body1"
                >
                    {description}
                </Typography>
                <Typography
                    className={classes.price}
                    variant="overline"
                    align="right"
                >
                    ${price}
                </Typography>
            </Paper>
        </React.Fragment>
    );
};

EventDetail.propTypes = {
    event: PropTypes.object,
    classes: PropTypes.object
};


export default withStyles(styles)(EventDetail);