import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';


export const Modal = props => {
	const { title, canCancel, canConfirm, children, onCancel, onConfirm } = props;
	
	const renderButtons = () => {
		let buttons = [];
		if (canCancel) {
			buttons.push(<button 
							key="cancel" 
							onClick={onCancel}>Cancel</button>);
		}
		if (canConfirm) {
			buttons.push(<button 
							key="confirm"
							onClick={onConfirm}>Confirm</button>);
		}
		return buttons;
	};

	return (
		<div className="modal">
			<header className="modal__header">{title}</header>
			<div className="modal__content">{children}</div>
			<div className="modal__actions">
				{renderButtons()}
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string, 
	canCancel: PropTypes.bool, 
	canConfirm: PropTypes.bool,
	children: PropTypes.node,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func
};
