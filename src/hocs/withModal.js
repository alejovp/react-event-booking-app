import React, { Component } from 'react';
import { Modal } from '../components/Modal/Modal';
import { Backdrop } from '../components/Backdrop/Backdrop';


export const withModal = (ComponentToRender) => (

    class extends Component {
        state = {
            open: false,
            modalTitle: undefined,
            modalContent: null,
        }

        showModal = (title, content) => this.setState({ 
            modalTitle: title,
            modalContent: content,
            open: true
        });

        closeModal = () => this.setState({ open: false });

        renderModal = () => {
            const { open, modalTitle, modalContent } = this.state;

            if (open) {
                return (
                    <React.Fragment>
                        <Backdrop onClose={this.closeModal} />
                        <Modal
                            title={modalTitle}
                            canCancel 
                            canConfirm
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
                    />
                </React.Fragment>
            );
        }
    }
);