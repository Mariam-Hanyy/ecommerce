import React, { useContext, useEffect, useState} from 'react'
import { cartContext } from '../../Context/CartContext'
import UserOrder from '../userOrder/UserOrder';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function AllOrders() {
    const {getUserOrders}=useContext(cartContext);
    const[orders,setOrders]=useState([])
    const[loading,setLoading]=useState(true)

     function userOrder(){
      setLoading(false)
        return  getUserOrders()
        .then(data=>{
          if (Array.isArray(data)) {
            setOrders(data);
          }

          setLoading(true)
        })
        .catch(error=>error)
        
      }
      useEffect(()=>{
        userOrder()
      },[])


    if(!loading)
      return <Loading/>
    
    if(orders.length===0 || !orders)
      return <div className='text-center text-main fs-1 my-5 py-5'>
        <h1>Hurry up to place your first order</h1>
        <Link to={'/'}><button className='btn button'>Go Shopping</button></Link>
      
        </div>
    

  return (
    <>
   
    <div className='py-5 my-5'>
      <div className="container">
        <div className="row g-4 bg-white">
      {orders.map(item=>{
        return <UserOrder item ={item}/>
      })}
      </div>
      </div>
      
    </div>
    </>
  )
}
