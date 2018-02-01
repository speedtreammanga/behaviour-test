import React, { Component } from 'react';
import Contact from './models/Contact';
import { Row, Col, Button } from 'react-bootstrap';

import EditContactModal from './components/NewContactModal';
import ContactList from './components/ContactList';
import {CONTACTS_STORAGE_KEY} from './config';

/**
 * App, englobes all other components
 */
class App extends Component {
    constructor() {
        super();
        this.state = {
            show_modal: false,
            contacts: [],
        };
    }

    /**
     * Loading contacts from storage, if nothing found, start with empty array.
     */
    componentDidMount = () => {
        const contacts = JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY)) || [];
        this.setState((prev) => {
            prev.contacts = contacts;
            return prev;
        });
    }

    /**
     * If creating new contact, push it to the list.
     * If editing contact, update the contact in the list.
     */
    handleCreateEditContact = (contact, callback) => {
        this.setState((prev) => {
            // if index >= 0, we're editing a contact, else, it's a new one...
            contact.index >= 0 ? 
                // update item.
                prev.contacts[contact.index] = contact
                // push to array.
                : prev.contacts.push(contact);
            return prev;
        }, () => {
            this.persistData();
            callback();
        });
    }

    /**
     * Open contact modal with selected contact.
     */
    handleContactEdit = (index) => this.edit_contact.editContact(this.state.contacts[index], index);

    /**
     * Removes contact with `index` from list.
     */
    handleContactRemove = (index) => {
        this.setState((prev) => {
            // remove contact X from list.
            prev.contacts.splice(index, 1);
            return prev;
        }, () => {
            this.persistData();
        })
    }

    /**
     * Write contacts list to local storage.
     */
    persistData = () => localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(this.state.contacts));

    /**
     * Renders components.
     */
    render() {
        const { contacts } = this.state;
        return (
            <div style={{ 
                maxWidth: 500, 
                margin: '0 auto',
                textAlign: "center"
            }}>
                <h2>A simple React List app 🚀</h2>

                <Row className="row row-app">
                    <Col xs={12}>
                        <ContactList
                            contacts={contacts}
                            onEdit={this.handleContactEdit}
                            onRemove={this.handleContactRemove}
                        />
                    </Col>
                </Row>

                <EditContactModal ref={instance => this.edit_contact = instance} saveContact={this.handleCreateEditContact}/>

                <Button onClick={() => this.edit_contact.handleModalDisplay()}>Add Contact</Button>
            </div>
        );
    }
}

export default App;