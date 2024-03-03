import React, { useState } from 'react'
import css from './Category.module.css'
import { Modal } from 'react-bootstrap'

export default function CategoriesModal({category}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn' onClick={handleShow}>
        <div className='position-relative'>
        <div>
              <img src={category?.image} alt={category.name} style={{height:'300px'}} className='w-100 ' />
        </div>
              <div className={`${css.layer} w-100 h-100 z-2 top-0 d-flex justify-content-center align-items-center position-absolute`}>
                <h4 className='fw-bold'>{category.name}</h4>
              </div>
      </div>
        </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0 pb-0 mb-0'>
        </Modal.Header>

        <Modal.Body>
         <img src={category.image} alt={category.name} className='w-75 mx-auto d-block' />
         <h4 className='fw-bold text-center'>{category.name} Category</h4>
        </Modal.Body>
      </Modal>
    </>
  )
}
