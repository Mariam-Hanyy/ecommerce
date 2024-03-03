import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../CartItem/CartItem';
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import { Link, useNavigate } from 'react-router-dom';


export default function Cart() {
    const [loading,setLoading]=useState(true)
    const [loadingClear,setLoadingClear]=useState(true)
    const{getCart,setUserCart,userCart,deleteCart,setCounter}=useContext(cartContext)
    const navigate=useNavigate()



      async function displayCart(){
        let data = await getCart()
        setLoading(false)
        setUserCart(data?.data)
      }
      async function deleteAllCart(){
        setLoadingClear(false)
        let data = await deleteCart()
        if(data.message==='success'){
          setUserCart('')
          setCounter()
          toast.success('Your Cart is Clear Now!')
          setLoadingClear(true)

        }

      }

      useEffect(()=>{
        displayCart()
      },[])


      if(loading) return <Loading/>
      if(!userCart || userCart.products.length===0) return <div className='text-center text-main fs-1 my-5 py-5'>
        <h1>Your Cart Is Empty</h1>
        <Link to={'/'}><button className='btn button'>Go Shopping</button></Link>
      </div>
  return (
    
    <>


    <div className='cart mt-5 pt-1 '>
      <div className="container my-5 px-5 pt-5 pb-1 bg-body-secondary">
        <div className='d-flex justify-content-between align-items-end'>
          <div>
            <h3>Shop Cart:</h3>
          <p className='text-main'>total cart price: {userCart?.totalCartPrice} EGP</p>
          </div>
          <div className=''>
            <button disabled={!loadingClear} onClick={deleteAllCart} className='btn '>
            {!loadingClear?<RotatingLines
              visible={true}
              height="25"
              width="25"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />:'Clear Cart'
            }</button>
          </div>
        </div>
        <CartItem userCart={userCart}/>
       
      
      </div>
    </div>
    </>
  )
}
