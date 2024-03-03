import React, { useContext, useState } from 'react'
import { cartContext, wishlistContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'

export default function WishlistItem({item}) {
  const{setCounter,addToCart}=useContext(cartContext)
  const {removeFromWishlist,setWishlistCounter}=useContext(wishlistContext)
  const[wishlistLoading,setWishlistLoading]=useState(true)
  const[cartloading,setCartLoading]=useState(true)

  async function removeItemFromWishlist(productId){
    setWishlistLoading(false)
    let data= await removeFromWishlist(productId)
    if(data.data.status==='success'){
      toast.error('Product removed successfully')
      setWishlistCounter(data.data.data.length)
      setWishlistLoading(true)

    }
  }

  async function addProductToCart(productId){
    setCartLoading(false)
    let data=await addToCart(productId)
    .then(data=>data)
    .catch(error=>error)
    
    if(data?.status==='success'){
      localStorage.setItem('userId',data?.data.cartOwner)
      toast.success('Added to your cart successfully')
      setCounter(data.numOfCartItems)
      setCartLoading(true)
    }
  }

  
  
  return (
    <>
        <div  className="row g-4 mb-4 pb-3 border-bottom " key={item._id}> 
          <div className="col-md-1">
            <img src={item.imageCover} alt={item.title} className='w-100' />
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center">
            <div>
            <p className='m-0'>{item.title}</p>
            <p className='text-main py-1 m-0'>Price:{item.price} EGP</p>
            </div>
            <div>
              <button disabled={!wishlistLoading} onClick={()=>{removeItemFromWishlist(item._id)}}
            className='btn button-outline btn-sm '>
              <i className="fa-regular fa-trash-can text-main me-2"></i>
              <span>Remove</span>
              </button>
            <button disabled={!cartloading} onClick={()=>{addProductToCart(item._id)}}
            className='btn button btn-sm d-block mt-2'>
              Add to cart
            </button>
            </div>
        </div>
        
       
    </div>
    </>
  )
}
