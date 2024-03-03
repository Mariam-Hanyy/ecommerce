import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function CartItem({userCart}) {
  let navigate=useNavigate()
  let [loadingProductitem,setLoadingProductitem]=useState(true)
  let [loading,setLoading]=useState(true)

  const {deleteItem,
    setCounter,
    setUserCart,
    updateItem
  }=useContext(cartContext)

  async function deleteItemFromCart(productId){
    setLoadingProductitem(false)
    let data =await deleteItem(productId)
    .then(data=>data)
    .catch(error=>error)

    if(data?.status==='success'){
      setLoadingProductitem(true)
      setCounter(data.numOfCartItems)
      setUserCart(data.data)
      toast.error('Product Removed successfuly')
    }
  }

  async function updateItemInCart(productId,count){
    setLoading(false)
    let data= await updateItem(productId,count)
    
    if(data.status==='success'){
      setCounter(data.numOfCartItems)
      setUserCart(data?.data)
      toast.success('Product Updated successfuly')
      setLoading(true)
    }
  }

    
  return (
    <div className='Cart-item'>
        {userCart?.products?.map(item=>{
            return <div key={item._id} className="row g-4 mb-4 pb-3 border-bottom ">
          <div className="col-md-1">
            <img src={item.product.imageCover} alt="" className='w-100' />
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center">
            <div>
            <p className='m-0'>{item.product.title}</p>
            <p className='text-main py-1 m-0'>Price: {item.price} EGP</p>
            <button disabled={!loadingProductitem} onClick={()=>{deleteItemFromCart(item.product._id)}} 
            className='btn button-outline btn-sm '>
              <i className="fa-regular fa-trash-can text-main me-2"></i>
              <span>Remove</span>
              </button>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <button disabled={!loading} onClick={()=>{updateItemInCart(item.product._id,item.count + 1)}} className='btn button-outline  btn-sm'>+</button>
              <span className='mx-2 '>{item.count}</span>
              <button disabled={item.count<=1 || !loading} onClick={()=>{updateItemInCart(item.product._id,item.count - 1)}} className='btn button-outline  btn-sm'>-</button>
            </div>
          </div>
        </div>
        
    })} 
        <button 
        onClick={()=>{navigate(`/createOrder/${userCart._id}`)}}
        className='btn button bg-main text-white d-block ms-auto mb-3'>Check-Out</button>
        
    </div>
  )
}
