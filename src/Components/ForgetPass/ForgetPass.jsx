import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { baseURL } from '../BaseURL/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'


let myschema =yup.object({
    email:yup.string().email('Email is not valid').required('your Email is required')
})



export default function ForgetPass() {

    let navigate=useNavigate()
    let [loading,setLoading]=useState(true)
    const [responseError,setResponseError]=useState('')
    async function forgetPass(email){
        setLoading(false)
        return await axios.post(`${baseURL}/api/v1/auth/forgotPasswords`,email)
        .then(data=>{
            if(data.data.statusMsg==='success'){
                setResponseError('')
                setLoading(true)
                navigate('/resetcode')
            }
    
        })
        .catch(error=>{
            setResponseError(error.response.data?.message)
            setLoading(true)
        })
        
    }

    let email=useFormik({
        initialValues:{
            email:''
        },
        onSubmit:(values)=>{
            console.log(values);
            forgetPass(values)
        },
        validationSchema: myschema
    })


  return (

    <>

        

    <div className='my-5 py-5 text-center container w-50'>
        <h3 className='mb-3 text-main'>Reset Password</h3>
        <form onSubmit={email.handleSubmit}>
        <input 
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        value={email.values.email}
        type="email" id='email'  className='form-control mb-1' placeholder='Enter your email' />
        {email.errors.email && email.touched.email? 
            <p className='error-msg'>{email.errors.email}</p>
            :''}

            {responseError?<p className='error-msg'>{responseError}</p>:''}

        <button type='submit' className='btn button mt-3'>
            {!loading?<RotatingLines
                visible={true}
                height="25"
                width="25"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            :'Reset password'}</button>
        </form>

      
    </div>
    </>
  )
}
