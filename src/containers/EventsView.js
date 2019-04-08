import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { EventsService } from '../services/EventsService';
import { withModal } from '../hocs/withModal';
import Event from '../components/Event/Event';


const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 16
    },
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

    onShowModal = () => this.props.onShowModal('Modal Title', <p>Modal Content</p>);

    renderEvents = () => {
        return this.state.events.map(event => (
            <Grid 
                item 
                xs={12}
                sm={4}
                md={3}
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
                <button onClick={this.onShowModal}>Open Modal</button>
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