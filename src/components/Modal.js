import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * Base modal components.
 * Displays a modal with a title, and a `close`
 * and `next` buttons at the bottom.
 */
class ReactModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            title,
            okText,
            handleDismiss,
            handleSuccess,
            show,
        } = this.props;

        return(
            <Modal show={show}>
                <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{this.props.children}</Modal.Body>

                <Modal.Footer>
                <Button onClick={handleDismiss}>Close</Button>
                <Button bsStyle="primary" onClick={handleSuccess}>{okText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ReactModal;