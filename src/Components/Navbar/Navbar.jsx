import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { cartContext, wishlistContext } from '../../Context/CartContext';

export default function Navbar() {
  const {counter,setCounter,getCart}=useContext(cartContext)
  const {wishlistCounter,setWishlistCounter,getwishlist}=useContext(wishlistContext)
  let token =localStorage.getItem('token');

  const navigate =useNavigate()
  

  useEffect(()=>{
    async function getLoggedCart(){
      let data=await getCart()
      setCounter(data?.numOfCartItems)
    }
    async function getloggedWishlist(){
      let data= await getwishlist()
      setWishlistCounter(data?.data?.count)
    }
    getLoggedCart()
    getloggedWishlist()
    
  },[])

  function logOut(){
    localStorage.clear()
    navigate('/login')
    
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed shadow-sm w-100 top-0 z-9 ">
  <div className="container">
  <Link className="navbar-brand" to="/">
      <img src={logo} alt="FreshCart" />
  </Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

  {token?<>
  
  <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center align-items-center">
      <li className="nav-item">
        <NavLink className='nav-link' to="/Home">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" to="/Products">Products</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/Categories">Categories</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/brands">Brands</NavLink>
      </li>
      
    </ul>
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-center align-items-center">
    <li className="nav-item">
      <ul className='d-flex list-unstyled '>
          <li>
              <NavLink className='text-black me-2' target='_blank'  to='https://www.instagram.com' ><i className="fa-brands fa-instagram"></i></NavLink>
          </li>
          <li>
              <NavLink className='text-black me-2' target='_blank'  to='https://www.facebook.com' ><i className="fa-brands fa-facebook"></i></NavLink>
          </li>
          <li>
              <NavLink className='text-black me-2' target='_blank'  to='https://www.tiktok.com' ><i className="fa-brands fa-tiktok"></i></NavLink>
          </li>
          <li>
              <NavLink className='text-black me-2' target='_blank'  to='https://www.twitter.com' ><i className="fa-brands fa-twitter"></i></NavLink>
          </li>
          <li>
              <NavLink className='text-black me-2' target='_blank'  to='https://www.youtube.com' ><i className="fa-brands fa-youtube"></i></NavLink>
          </li>
      </ul>
      </li>
      <li className="nav-item">
        <Link className="nav-link position-relative" to="/Cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {counter?<span  className="position-absolute top-0 start-100 translate-middle badge  bg-danger">
          {counter}
        </span>:''}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link position-relative" to="/wishlist">
        <i className="fa-solid fa-heart"></i>
        {wishlistCounter?<span  className="position-absolute top-0 start-100 translate-middle badge  bg-danger">
          {wishlistCounter}
          </span>:''}
        
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link position-relative" to="/allorders">My-Orders</Link>
      </li>
      <li className="nav-item">
        <button onClick={()=>{logOut()}} className='btn nav-link' >Log Out</button>
      </li>
    </ul>
    </>:
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-center align-items-center">
      <li className="nav-item">
        <ul className='d-flex list-unstyled '>
            <li>
                <NavLink className='text-black me-2' target='_blank'  to='https://www.instagram.com' ><i className="fa-brands fa-instagram"></i></NavLink>
            </li>
            <li>
                <NavLink className='text-black me-2' target='_blank'  to='https://www.facebook.com' ><i className="fa-brands fa-facebook"></i></NavLink>
            </li>
            <li>
                <NavLink className='text-black me-2' target='_blank'  to='https://www.tiktok.com' ><i className="fa-brands fa-tiktok"></i></NavLink>
            </li>
            <li>
                <NavLink className='text-black me-2' target='_blank'  to='https://www.twitter.com' ><i className="fa-brands fa-twitter"></i></NavLink>
            </li>
            <li>
                <NavLink className='text-black me-2' target='_blank'  to='https://www.youtube.com' ><i className="fa-brands fa-youtube"></i></NavLink>
            </li>
        </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/register">Register</NavLink>
        </li>
      </ul>
    }
  </div>
</div>
</nav>
</>
  )
}
