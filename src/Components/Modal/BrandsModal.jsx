import { useState } from 'react';
import {  Modal } from 'react-bootstrap';

export default function BrandsModal({brand,key}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="col-md-3" key={key}>
      <button className='btn' onClick={handleShow}>
        <img src={brand.image} alt={brand.name} className='w-100' />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
        </Modal.Header>

        <Modal.Body>
         <img src={brand.image} alt={brand.name} className='w-100' />
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
}
