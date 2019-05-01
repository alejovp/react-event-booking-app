import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import defaultImg from './img/no-image.png';


const styles = {
    card: {
        maxWidth: 345,
        minHeight: 355,
        margin: 'auto',
        position: 'relative'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    price: {
        position: 'absolute',
        bottom: 0,
        fontSize: 15,
        right: 10
    }
};

const dateFormatter = date => {
    const dateObj = new Date(date);
    let minutes = dateObj.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${dateObj.toLocaleDateString()} | ${dateObj.getHours()}:${minutes}`;
};

const Event = ({title, description, creator, date, price, classes}) => {
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                // alt="No image available"
                className={classes.media}
                height="140"
                image={defaultImg}
                // title="No image available"
            />
            <CardContent>
                <Typography 
                    variant="subtitle2" 
                    color="textSecondary"
                >
                    {dateFormatter(date)}
                </Typography>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                    {title}
                </Typography>
                <Typography component="p">
                    {description}
                </Typography>
                <Typography 
                    variant="overline"
                    align="right"
                    className={classes.price}
                >
                    {price}$
                </Typography>
            </CardContent>
        </Card>
    );
};

Event.propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    creator: PropTypes.object
};

export default withStyles(styles)(Event);