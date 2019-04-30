import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import { Backdrop } from '../components/Backdrop/Backdrop';


export const withModal = (ComponentToRender) => (

    class extends Component {
        state = {
            open: false,
            modalTitle: undefined,
            modalContent: null,
            canConfirm: undefined,
            canCancel: undefined,
            onConfirm: undefined,
            onCancel:undefined
        }

        showModal = (title, content, canConfirm, onConfirm, canCancel, onCancel) => this.setState({ 
            modalTitle: title,
            modalContent: content,
            open: true,
            canCancel,
            onCancel,
            canConfirm,
            onConfirm
        });

        closeModal = () => this.setState({ open: false });

        renderModal = () => {
            const { open, modalTitle, modalContent, canConfirm, canCancel, onConfirm } = this.state;

            if (open) {
                return (
                    <React.Fragment>
                        <Backdrop onClose={this.closeModal} />
                        <Modal
                            title={modalTitle}
                            canCancel={canCancel}
                            canConfirm={canConfirm}
                            onConfirm={onConfirm}
                            onCancel={this.closeModal}
                        >
                            {modalContent}
                        </Modal>
                    </React.Fragment>
                );
            } else {
                return null;
            }
        }

        render () {
            return (
                <React.Fragment>
                    { this.renderModal() }
                    <ComponentToRender 
                        {...this.props}
                        onShowModal={this.showModal}
                        onCloseModal={this.closeModal}
                    />
                </React.Fragment>
            );
        }
    }
);