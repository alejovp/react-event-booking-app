import React from 'react';

import './Modal.scss';


const renderButtons = (canCancel, canConfirm) => {
	let buttons = [];
	if (canCancel) {
		buttons.push(<button key="cancel">Cancel</button>);
	}
	if (canConfirm) {
		buttons.push(<button key="confirm">Confirm</button>);
	}
	return buttons;
};

export const Modal = props => {
	const { title, canCancel, canConfirm, children } = props;

	return (
		<div className="modal">
			<header className="modal__header">{title}</header>
			<div className="modal__content">{children}</div>
			<div className="modal__actions">
				{renderButtons(canCancel, canConfirm)}
			</div>
		</div>
	);
}
