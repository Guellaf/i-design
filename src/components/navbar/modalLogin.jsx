import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ModalLogin = ({modalState, email, password, btnName, title, errors, login, toggle, onHandleInput}) => {
  return (
    <Modal  isOpen={modalState} toggle={toggle} >
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" value={email} onChange={(event) => onHandleInput(event)} id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" value={password} onChange={(event) => onHandleInput(event)} id="examplePassword" placeholder="password" />
          </FormGroup>
        </Form>
        <p style={{color: 'red'}}>{errors}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={(e)=>login(e)}>{btnName}</Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default ModalLogin;
