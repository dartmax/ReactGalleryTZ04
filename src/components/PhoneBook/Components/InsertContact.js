import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import '../index.css'

const InsertContact = ({handleAdd, setInput}) => {
  const [show, setShow] = useState(false);
  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  const inputEl3 = useRef(null);
  const inputEl4 = useRef(null);
  const fileRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageUpload = (e) => {
    const { files } = e.target;
    let images = [];
    const selecteds = [...files];
    selecteds.forEach(i => images.push(URL.createObjectURL(i)));

    setInput(images);
  };

  return (
    <div>
      <Button className="btn-add" variant="primary" onClick={handleShow}>Add Contact</Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Adding Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Contact name</Form.Label>
                  <Form.Control className="forms" ref={inputEl1} type="contactName" placeholder="name contact" />
                </Col>
                <Col>
                  <Form.Label>Contact surname</Form.Label>
                  <Form.Control className="forms" ref={inputEl2} type="contactSurName" placeholder="surname contact" />
                </Col>
                <Col>
                  <Form.Label>Contact number</Form.Label>
                  <Form.Control className="forms" ref={inputEl3} type="contactNumber" placeholder="number contact" />
                </Col>
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control className="forms" ref={inputEl4} type="contactNumber" placeholder="Description" />
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <input type="file" accept="image/*" ref={fileRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onChange={handleImageUpload} onClick={() => {
            handleAdd(inputEl1.current.value, inputEl2.current.value, inputEl3.current.value, inputEl4.current.value, fileRef.current.files);
            handleClose();
          }}>
            Add Contact
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default InsertContact;