import React, { createContext, useState } from 'react'
import { baseURL } from '../Components/BaseURL/BaseUrl';
import axios from 'axios';
export const cartContext=createContext(0);

export const wishlistContext =createContext(0);

const header ={headers:{
  token:localStorage.getItem('token')
}}


/////////////// Cart Context ///////////////////////

async function getCart(){
  return await axios.get(`${baseURL}/api/v1/cart`,header)
  .then(({data})=>data)
  .catch(error=>error)
}

async function addToCart(productId){
  return await axios.post(`${baseURL}/api/v1/cart`,{productId},header)
  .then(({data})=>data)
  .catch(error=>error)

}

async function deleteItem(productId){
  return await axios.delete(`${baseURL}/api/v1/cart/${productId}`,header)
  .then(({data})=>data)
  .catch(error=>error)
}
async function deleteCart(){
  return await axios.delete(`${baseURL}/api/v1/cart`,header)
  .then(({data})=>data)
  .catch(error=>error)
}
async function updateItem(productId,count){
  return await axios.put(`${baseURL}/api/v1/cart/${productId}`,{count},header)
  .then(({data})=>data)
  .catch(error=>error)
}
async function payOnline(productId,shippingAddress){
  return await axios.post(`${baseURL}/api/v1/orders/checkout-session/${productId}?url=http://localhost:3000`,{shippingAddress},header)
  .then(({data})=>data)
  .catch(error=>error)
}
async function payCash(productId,shippingAddress){
  return await axios.post(`${baseURL}/api/v1/orders/${productId}`,{shippingAddress},header)
  .then(({data})=>data)
  .catch(error=>error)
}
async function getUserOrders(){
  const userId=localStorage.getItem('userId')
  return await axios.get(`${baseURL}/api/v1/orders/user/${userId}`)
  .then(({data})=>data)
  .catch(error=>error)
}


/////////////// Wishlist Context ///////////////////////

async function addToWishlist(productId){
  return axios.post(`${baseURL}/api/v1/wishlist`,{productId},header)
  .then(data=>data)
  .catch(error=>error)
}

async function getwishlist(){
  return await axios.get(`${baseURL}/api/v1/wishlist`,header)
  .then(data=>data)
  .catch(error=>error)
}

async function removeFromWishlist(productId){
  return await axios.delete(`${baseURL}/api/v1/wishlist/${productId}`,header)
}


export default function CounterContext({children}) {
    const [counter,setCounter]=useState(0);
    const [userCart,setUserCart]=useState([])
    
    const [wishlistCounter,setWishlistCounter]=useState(0);
    
    



  return (
    <div>
      <wishlistContext.Provider 
      value={
        {addToWishlist,
          getwishlist,
          removeFromWishlist,
          wishlistCounter,
          setWishlistCounter,}
      }
      >

      <cartContext.Provider 
        value={
        {counter,
        setCounter,
        getCart,
        userCart,
        setUserCart,
        addToCart,
        deleteItem,
        updateItem,
        deleteCart,
        payOnline,
        payCash,
        getUserOrders,
        }}>
        {children}
      </cartContext.Provider>

      </wishlistContext.Provider>
    </div>
  )
}
