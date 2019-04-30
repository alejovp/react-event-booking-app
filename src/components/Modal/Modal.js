import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ConfirmButton from '../ConfirmButton/ConfirmButton';

import './Modal.scss';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

const Modal = ({ title, canCancel, canConfirm, children, onCancel, onConfirm, classes }) => {
	
	const renderButtons = () => {
		let buttons = [];
		if (canConfirm) {
			buttons.push(<ConfirmButton
							key="confirm"
							variant="contained"
							className={classes.button}
							onClick={onConfirm}>
								Confirm
						</ConfirmButton>);
		}
		if (canCancel) {
			buttons.push(<Button
							key="cancel"
							variant="contained"
							className={classes.button}
							color="secondary"
							onClick={onCancel}>
								Cancel
						</Button>);
		}

		if (!canConfirm && !canCancel) {
			return null;
		}
		
		return (
			<div className="modal__actions">
				{buttons}
			</div>
		);
	};

	return (
		<div className="modal">
			<header className="modal__header">{title}</header>
			<div className="modal__content">{children}</div>
			{renderButtons()}
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string, 
	canCancel: PropTypes.bool, 
	canConfirm: PropTypes.bool,
	children: PropTypes.node,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	classes: PropTypes.object
};

export default withStyles(styles)(Modal);