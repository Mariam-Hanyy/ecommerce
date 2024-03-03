import axios from 'axios'
import React, { useState } from 'react'
import { baseURL } from '../BaseURL/BaseUrl'
import { useFormik } from 'formik'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function CreatePass() {
    let [loading,setLoading]=useState(true)
    const navigate =useNavigate()
    
    const [responseError,setResponseError]=useState('')

    async function resetPassword(userData){
        setLoading(false)
        return await axios.put(`${baseURL}/api/v1/auth/resetPassword`,userData)
        .then(data=>{
            setLoading(true)
            setResponseError('')
            navigate('/login')
            toast('Your Password changed successfully')
        })
        .catch(error=>{
            setLoading(true)
            setResponseError(error.response.data?.message)

        })

    }

    const resetPass= useFormik({
        initialValues:{
            email:"",
            newPassword: ""
        },
        onSubmit:(values)=>{
            resetPassword(values)
        }
    })

  return (
    <>
       


    <div>
      <div className='container w-25 text-center my-5 py-5'>
        <h3>Create New Password</h3>
        <form onSubmit={resetPass.handleSubmit}>
        <input type="email" id='email' name='email' className='form-control mb-1' placeholder='Enter your email'
        onChange={resetPass.handleChange}
        onBlur={resetPass.handleBlur}
        value={resetPass.values.email}
        />  
        {resetPass.errors.email && resetPass.touched.email? 
            <p className='error-msg'>{resetPass.errors.email}</p>
            :''}
        
        <input 
         onChange={resetPass.handleChange}
         onBlur={resetPass.handleBlur}
         value={resetPass.values.newPassword}
        type="password" name="newPassword" id="newPassword" className='form-control mb-1' placeholder='New Password'
        />

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
                />:'Change Password'}
            </button>
      </form>

    </div>
    </div>
    </>
  )
}
