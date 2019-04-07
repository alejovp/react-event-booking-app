import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.scss';


export const Backdrop = props => <div className="backdrop" onClick={props.onClose}></div>;

Backdrop.propTypes = {
    onClose: PropTypes.func
};