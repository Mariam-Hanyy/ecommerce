import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { baseURL } from '../BaseURL/BaseUrl'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function BrandDetails() {
    let brandID = useParams()
    let[details,setDetails]=useState([])
    let[loading,setLoading]=useState(false)
    

    async function BrandDetails(){
        setLoading(true)
        return await axios.get(`${baseURL}/api/v1/brands/${brandID.id}`)
        .then(data=>{
            setDetails(data?.data?.data)
            setLoading(false)
        })
        .catch(error=>error)

    }
    useEffect(()=>{
        BrandDetails()
    },[])

        if(loading) return <Loading/>
        
  return (
    <div>
       

        <div className="container my-5 py-5">
            <div className="row align-items-center">
                <h4 className='text-main pb-4'>Brand Details:</h4>
                <div className="col-md-3">
                    <img src={details.image} className='w-100' alt="" />
                </div>
                <div className="col-md-9 ">
                    <h5> <span className='fw-bold'>Brand Name: </span>{details.name}</h5>
                    <p className='text-body-secondary'>{details.slug}</p>
                    
           
                </div>
            </div>
        </div>

    </div>
  )
}
