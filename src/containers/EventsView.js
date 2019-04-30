import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { EventsService } from '../services/EventsService';
import { withModal } from '../hocs/withModal';
import Event from '../components/Event/Event';
import EventForm from '../components/EventForm.js/EventForm';


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 16,
        width: '80vw',
        margin: '0 auto',
    },
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    }
};

class EventsView extends Component {

    state = {
        events: []
    }

    componentDidMount = () => {
        new EventsService()
            .getEvents()
            .then(this.setEvents)
            .catch(err => {
                console.error(err);
            });
    }

    setEvents = events => this.setState({ events });

    onShowModal = () => this.props.onShowModal(
        'New Event', 
        <EventForm 
            onSubmit={this.onSubmit}
            onCancel={this.props.onCloseModal}
        />
    );

    onSubmit = params => {
        console.log(params);
        this.props.onCloseModal()
    }

    renderEvents = () => {
        return this.state.events.map(event => (
            <Grid 
                item 
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={event._id}
            >
                <Event
                    title={event.title}
                    description={event.description}
                    price={event.price}
                    creator={event.creator}
                />
            </Grid>
        ));

    }
    
    render() {
        const { classes } = this.props;

        return (    
            <div>
                <h1>This is the events view!</h1>
                <Fab 
                    className={classes.fab}
                    onClick={this.onShowModal}
                    color="primary"
                >
                    <AddIcon />
                </Fab>
                <div className={classes.container}>
                    <Grid container spacing={16}>
                        { this.renderEvents() }
                    </Grid>
                </div>
            </div>
        );
    }
}

EventsView.propTypes = {
    classes: PropTypes.object
};

export default withModal(withStyles(styles)(EventsView));