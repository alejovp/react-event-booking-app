import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Loading.scss';
import { bool } from 'prop-types';


export const Loading = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="loading">
            <CircularProgress/>
        </div>
    );
};

Loading.propTypes = {
    isLoading: bool
};