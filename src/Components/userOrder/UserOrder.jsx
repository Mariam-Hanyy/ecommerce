import React from 'react'

export default function UserOrder({item}) {
  return (

        <div className="col-md-4  " key={item._id}>
          <div className='orderDetails m-2 bg-body-secondary h-100 p-4 rounded'>
          <div className="order">
          <h4 className='py-1 text-main'>Payment Details</h4>
          <h6><span className='fw-bolder'>Payment Method:</span> {item.paymentMethodType}</h6>
          <h6><span className='fw-bolder'>Total price:</span> {item.totalOrderPrice} EGP</h6>
            
            <p>
              <span className='fw-bold'>Shipping Details: </span>{item.shippingAddress.details}, {item.shippingAddress.city}, {item.shippingAddress.phone}
            </p>
          </div>
          <hr />
          {item?.cartItems.map(product=>{
            return <div className='row ' key={product._id}>
              <div className="col-md-3">
          <img src={product.product.imageCover} alt={product.product.category.name}  className='w-100 rounded'/>
              </div>
              <div className="col-md-9  ">
            <h6 className='text-main py-1'>{product.product.title.split(' ').splice(0,2).join(' ')}</h6>
            <h6><span className='fw-bold'>Category: </span>{product.product.category.name}</h6>
            <h6><span className='fw-bold'>Brand: </span>{product.product.brand.name}</h6>
              <p><span className='fw-bold'>Price: </span>{product.price} EGP</p>
              </div>
          </div>
          })}
          
          </div>
          </div>


          
  )
}
