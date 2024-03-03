import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { baseURL } from '../BaseURL/BaseUrl';


export default function Products() {
  let [loading,setLoading]=useState(true)
  let [products,setProducts]=useState([])
  

  async function getProducts(){
    const {data}= await axios.get(`${baseURL}/api/v1/products`)
    .then(data=>data)
    .catch(error=>error)
    setProducts(data?.data)
    setLoading(false)
  }

  useEffect(()=>{
    getProducts()
  },[])

if(loading) return <Loading/>
return (

  <>

  

    <div className='container pt-5 my-5'>
      <div className="row g-4 ">
          {products?.map((product)=>{
            return <Product product={product} key={product._id}/>
        })}
        
      </div>
      
    </div>
  </>
  )
}
