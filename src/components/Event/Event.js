import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import defaultImg from '../../assets/img/no-image.png';


const styles = {
    card: {
        maxWidth: 345,
        // minHeight: 355,
        margin: 'auto',
        position: 'relative'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    content: {
        minHeight: 90,
    },
    price: {
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

const Event = ({eventData, onSelection, classes}) => {
    const { _id, title, description, date, price, creator } = eventData;
    const formattedDate = dateFormatter(date);

    const onSelectionHandler = () => onSelection({ _id, title, description, date: formattedDate, price, creator });

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={onSelectionHandler}>
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
                        {formattedDate}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography 
                        component="p"
                        className={classes.content}
                    >
                        {description}
                    </Typography>
                    <Typography 
                        variant="overline"
                        align="right"
                        className={classes.price}
                    >
                        ${price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

Event.propTypes = {
    eventData: PropTypes.object,
    classes: PropTypes.object,
    onSelection: PropTypes.func
};

export default withStyles(styles)(Event);