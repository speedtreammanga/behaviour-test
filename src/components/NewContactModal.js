import React, { Component } from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import ReactModal from './Modal';
import Contact from '../models/Contact';

/**
 * Displays a modal with fields in order to
 * create or edit objects from the contacts list.
 */
class EditContactModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: undefined,
            show: false,
            contact: new Contact({}),
        };
        // fields to be used in the modal.
        this.fields = [
            {context: 'First Name'},
            {context: 'Last Name'},
            {context: 'Age'},
        ]
    }

    /**
     * Set the contact with and index to edit in the state.
     */
    editContact = (contact, index) => {
        this.setState((prev) => {
            prev.contact = new Contact({...contact, index});
            return prev;
        }, () => {
            this.handleModalDisplay();
        });
    }

    /**
     * Toggle the the modal according to its previous value.
     * Reset the `contact` if we're closing the modal.
     * Set action to `edit` if `contact` if a new object.
     */
    handleModalDisplay = () => {
        this.setState((prev) => ({
            show: !prev.show,
            contact: prev.show ? new Contact({}) : prev.contact,
            action: prev.contact.firstname.length > 0 ? 'edit' : 'add'
        }));
    };

    /**
     * If no fields are empty, save the contact to the list.
     */
    handleNext = () => {
        const {firstname, lastname, age} = this.state.contact;
        // no fields empty or else, return;
        if (firstname.length === 0 || lastname.length === 0 || age.length === 0) {
            return;
        }
        this.props.saveContact(this.state.contact, this.handleModalDisplay);
    };

    /**
     * Update state with what the user is typing in `context` field.
     */
    handleChange = (e, context) => {
        const newVal = e.target.value;

        this.setState((prev) => {
            prev.contact[context] = newVal
            return prev;
        });
    };

    render() {
        const { action, show, contact } = this.state;
        return(
            <div className="static-modal">
                <ReactModal
                    title={action === 'add' ? 'Add Contact' : 'Edit Contact'} 
                    show={show}
                    okText={action === 'add' ? 'Create' : 'Update'}
                    handleDismiss={this.handleModalDisplay}
                    handleSuccess={this.handleNext}
                >

                {this.fields.map((field, index) => {
                    const context_flat = field.context.toLowerCase().replace(' ', '');
                    return(
                        <FormGroup controlId={context_flat} key={context_flat}>
                            <ControlLabel>{field.context} *</ControlLabel>
                            <FormControl
                                type="text"
                                value={contact[context_flat]}
                                placeholder="Enter text"
                                onChange={(e) => this.handleChange(e, context_flat)}
                            />
                        </FormGroup>
                    );
                })}

                </ReactModal>
            </div>
        );
    }
}

export default EditContactModal;