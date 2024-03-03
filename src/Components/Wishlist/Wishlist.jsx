import React, { useContext} from 'react'

import WishlistItem from '../WishlistItem/WishlistItem'
import { wishlistContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Wishlist() {
        const {getwishlist}=useContext(wishlistContext)
        

        async function getWishlistProducts(){
            return await getwishlist()
            
        }
        
        const {data,isLoading}=useQuery('getWishlist',getWishlistProducts,{
            refetchInterval:500,

        })

        
        if(isLoading){
        return <Loading/>
        }

        if(data.data.count===0) return <div className='text-center text-main fs-1 my-5 py-5'>
            <h1>Your Wishlist Is Empty</h1>
        <Link to={'/'}><button className='btn button'>Go Shopping</button></Link>
      
        </div>
  
        
    return (
    <>

        <div className='cart mt-5 pt-1 '>
        <div className="container my-5 px-5 pt-5 pb-1 bg-body-secondary">
        
            <h3 >Wishlist:</h3>
            <hr className='my-3 text-main'/>
            
            
        <div>
            {data?.data?.data.map(item=>{
                return <WishlistItem item={item} />
            })

            }
        </div>
        </div>
        </div>
    </>

)}