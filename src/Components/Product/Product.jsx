import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext, wishlistContext } from '../../Context/CartContext'

import { toast } from 'react-toastify';

import { ColorRing } from 'react-loader-spinner';


export default function Product({product}) {
  const {addToCart,setCounter}=useContext(cartContext)
  const {addToWishlist,setWishlistCounter}=useContext(wishlistContext)
  
  let [loadingProduct,setLoadingProduct]=useState(true)
  let [productID,setProductID]=useState([])

  async function addProductToCart(productId){
    setLoadingProduct(false)
    let data=await addToCart(productId)
    .then(data=>data)
    .catch(error=>error)
    
    if(data?.status==='success'){
      localStorage.setItem('userId',data?.data.cartOwner)
      setLoadingProduct(true)
      toast.success('Added to your cart successfully')
      setCounter(data.numOfCartItems)
    }
  }

  async function addProductToWishlist(productId){
    let data =await addToWishlist(productId)
    if(data?.data?.status==='success'){
      toast.success(data?.data?.message)
      setWishlistCounter(data?.data?.data.length)
      setProductID(data?.data?.data)
    }
  }

  return (
    <>

      <div  className="col-md-2 py-2 rounded product cursor-pointer">
            <Link to={'/productDetails/' + product._id}>
            <img src={product.imageCover} alt={product.title.split(' ').splice(0,2).join(' ')}  className='w-100 rounded'/>
            <h6 className='text-main py-1'>{product.category.name} </h6>
            <h6>{product.title.split(' ').splice(0,2).join(' ')}</h6>
            <div className='d-flex justify-content-between'>
              <p> {product.price} EGP</p>
              <p><i className="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</p>
            </div>
            </Link>
            <div className='d-flex justify-content-between align-items-center'>
            <button disabled={!loadingProduct} onClick={()=>{addProductToCart(product._id)}
          } className='btn text-capitalize button'>
            {!loadingProduct?<ColorRing
            visible={true}
            height="25"
            width="25"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />:'Add To Cart'}
          </button>

          <button
          disabled={productID.includes(product._id)}
          onClick={()=>{addProductToWishlist(product._id)}} className='btn wishlist m-0 p-0 border-0'>
            <i className={`fa-solid fa-heart ${productID.includes(product._id)?'text-danger':''}`}></i>
          </button>
            </div>
        
        </div>
    </>
  )
}
