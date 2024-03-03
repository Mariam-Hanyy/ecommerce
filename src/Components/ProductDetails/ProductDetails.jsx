import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { cartContext, wishlistContext } from '../../Context/CartContext'
import { ColorRing} from 'react-loader-spinner'
import { toast } from 'react-toastify'


export default function ProductDetails() {

   let productId= useParams()

   let [details,setDetails]=useState([])
   let [loading,setLoading]=useState(true)
   let [loadingProduct,setLoadingProduct]=useState(true)
   let [wishlist,setWishlist]=useState(true)
   let {addToCart,setCounter}=useContext(cartContext)
  const {addToWishlist,setWishlistCounter}=useContext(wishlistContext)
   

   async function getDetails(){
    let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId.id}`)
    setLoading(false)
    setDetails(data.data)
    
   }


   async function addProductToCart(productId){
       setLoadingProduct(false)
       let data=await addToCart(productId)
       if(data.status==='success'){
        setLoadingProduct(true)
        toast.success('Added to your cart successfully')
        setCounter(data.numOfCartItems)
      }
    
   }

     async function addProductToWishlist(productId){
        setWishlist(false)
    let data =await addToWishlist(productId)
    if(data.data.status==='success'){
      toast.success(data.data.message)
      setWishlist(true)
      setWishlistCounter(data.data.data.length)

    }
  }

   useEffect(()=>{
    getDetails()
   },[])

   if(loading) return <Loading/>
  return (
    <div>
      

        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img src={details.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-8 ">
                    <h5>{details.title}</h5>
                    <p>{details.description}</p>
                    <p>{details.category.name}</p>
                    <div className='d-flex justify-content-between'>
                    <p> {details.price} EGP</p>
                    <p><i className="fa-solid fa-star rating-color"></i> {details.ratingsAverage}</p>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <button disabled={!loadingProduct} 
            onClick={()=>{addProductToCart(details._id)}} 
            className='btn w-50 me-1 button-outline bg-main border-none text-white my-3'>
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
            <button disabled={!wishlist} 
            onClick={()=>{addProductToWishlist(details._id)}} 
            className='btn w-50 button bg-main border-none text-white'>
            {!wishlist?<ColorRing
            visible={true}
            height="25"
            width="25"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />:'Add To Wishlist'}
            </button>
            </div>
                </div>
            </div>
        </div>

    </div>
    )
}
