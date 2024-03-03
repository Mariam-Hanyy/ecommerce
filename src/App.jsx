import React from 'react'
import { RouterProvider,  createHashRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import NotFound from './Components/NotFound/NotFound'
import CartContext from './Context/CartContext'
import Cart from './Components/Cart/Cart'
import { ToastContainer } from 'react-toastify'
import CreateOrder from './Components/CreateOrder/CreateOrder'
import AllOrders from './Components/AllOrders/AllOrders'
import { QueryClient, QueryClientProvider } from 'react-query'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import ResetCode from './Components/resetCode/ResetCode'
import CreatePass from './Components/CreatePass/CreatePass'
import Wishlist from './Components/Wishlist/Wishlist'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import BrandDetails from './Components/BrandDetails/BrandDetails'
import { Offline } from 'react-detect-offline'

export default function App() {
const myRouter =createHashRouter([
  {path:'/',element:<Layout/> , children:[
    {path:'register',element: <Register/>},
    {path:'login',element: <Login/>},
    {path:'forgetpassword',element: <ForgetPass/>},
    {path:'resetcode',element: <ResetCode/>},
    {path:'createpass',element: <CreatePass/>},
  
    {index:true,element: <ProtectedRoutes> <Home/> </ProtectedRoutes>},
    {path:'Home',element: <ProtectedRoutes> <Home/> </ProtectedRoutes>},
    {path:'cart',element: <ProtectedRoutes> <Cart/> </ProtectedRoutes>},
    {path:'wishlist',element: <ProtectedRoutes> < Wishlist/> </ProtectedRoutes>},
    {path:'createOrder/:id',element: <ProtectedRoutes> <CreateOrder/> </ProtectedRoutes>},
    {path:'allorders',element: <ProtectedRoutes> <AllOrders/> </ProtectedRoutes>},
    {path:'Products',element: <ProtectedRoutes> <Products/> </ProtectedRoutes>},
    {path:'productDetails/:id',element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:'Categories',element: <ProtectedRoutes> <Categories/> </ProtectedRoutes>},
    {path:'categoryDetails/:id',element: <ProtectedRoutes> <CategoryDetails/> </ProtectedRoutes>},
    {path:'Brands',element: <ProtectedRoutes> <Brands/> </ProtectedRoutes>},
    {path:'brandDetails/:id',element: <ProtectedRoutes> <BrandDetails/> </ProtectedRoutes>},
    {path:'*',element: <ProtectedRoutes> <NotFound/> </ProtectedRoutes>},
  ]}
])

const myClient =new QueryClient()
  return (
    <>


    <ToastContainer
    theme="dark" 
    autoClose={1000}
    />

    <Offline>
      <div className='bg-warning fixed-top mt-5 fw-bold   start-50 translate-middle text-center w-25 rounded p-2'>
        Please, Check your internet connection!
      </div>
    </Offline>

    <QueryClientProvider client={myClient}>

      <CartContext>
      <RouterProvider router={myRouter}/>
     
      </CartContext>

    </QueryClientProvider>


    </>
  )
}
