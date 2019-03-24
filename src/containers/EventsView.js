import React, { Component } from 'react';
import { withModal } from '../hocs/withModal';


class EventsView extends Component {

    onShowModal = () => this.props.onShowModal('Modal Title', <p>Modal Content</p>);
    
    render() {
        return (
            <div>
                <h1>This is the events view!</h1>
                <button onClick={this.onShowModal}>Open Modal</button>
            </div>
        );
    }
}

export default withModal(EventsView);