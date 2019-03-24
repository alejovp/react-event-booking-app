import React from 'react';

import './Modal.scss';


const renderButtons = (canCancel, canConfirm) => {
	let buttons = [];
	if (canCancel) {
		buttons.push(<button>Cancel</button>);
	}
	if (canConfirm) {
		buttons.push(<button>Confirm</button>);
	}
	return buttons;
};

export const Modal = props => {
	const { title, canCancel, canConfirm, children } = props;

	return (
		<div className="modal">
			<header className="modal__title">{title}</header>
			<section className="modal__content">{children}</section>
			<section className="modal__actions">
				{renderButtons(canCancel, canConfirm)}
			</section>
		</div>
	);
}
