import React from 'react';
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

export default function ModalC() {

  const {isShowModal, setIsShowModal} = useContext(MyContext);

  return (
    <>
      <Modal show={isShowModal}>
        <Modal.Header>
          <Modal.Title>success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your ad has been uploaded successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" >
            <Link onClick={()=>setIsShowModal(false)} to={'/'}>Go To Home Page</Link>
          </Button>
          <Button variant="dark" onClick={()=>setIsShowModal(false)}>
          <Link to={'/MyAccount'}>Go To Your Account</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
