import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

/**
 * Displays contacts in a table list with
 * two options:
 * 1) Edit
 * 2) Remove
 */
class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        };
    }

    /**
     * Updates contacts upon receiving them.
     */
    componentWillReceiveProps = (props) => {
        this.setState({contacts: props.contacts});
    }
    
    /**
     * Handles `Edit` clicks
     */
    handleEdit = (e, index) => {
        e.preventDefault();
        this.props.onEdit(index);
    }
    
    /**
     * Handles `Remove` clicks
     */
    handleRemove = (e, index) => {
        e.preventDefault();
        this.props.onRemove(index);
    }

    render() {
        const { contacts } = this.state;
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => {
                        return(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.age}</td>
                                <td><a 
                                    onClick={(e) => this.handleEdit(e, index)}
                                    style={{cursor: "pointer"}}
                                >Edit</a></td>
                                <td><a 
                                    onClick={(e) => this.handleRemove(e, index)}
                                    style={{cursor: "pointer", color: '#d21414'}}
                                >Remove</a></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default ContactList;