import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'

import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'

const mySchema = yup.object ({
    email:yup.string().email().required(),
    password:yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
});

export default function Login() {
 const navigate =useNavigate()
    const [responseError,setResponseError]=useState('')
    const[loading,setLoading]=useState(false)


   async function signIn(userData){
    setLoading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
        .then((success)=>{
            localStorage.setItem('token',success?.data?.token)
            navigate('/Home')

            setResponseError('')

        })
        .catch((error)=>{
            setLoading(false)
            setResponseError(error?.response?.data?.message)
        })
    }


const login =useFormik({
    initialValues:{
        email:'',
        password:''
    },
    onSubmit: function(values){
        signIn(values)

    },
    validationSchema:mySchema
})



  return (
    <>


    <div className="container w-75 my-5 py-5">
        <h2>login Now:</h2>
        <form onSubmit={login.handleSubmit} >
           
            <label htmlFor="email">Email:</label>
            <input 
            onChange={login.handleChange} 
            onBlur={login.handleBlur} 
            value={login.values.email} 
            className='form-control' type="email" name="email" id="email" />
            {login.errors.email && login.touched.email? 
            <p className='error-msg'>{login.errors.email}</p>
            :''}

            <label htmlFor="password">Password:</label>
            <input 
            onChange={login.handleChange} 
            onBlur={login.handleBlur} 
            value={login.values.password} 
            className='form-control' type="password" name="password" id="password" />
            {login.errors.password && login.touched.password? 
            <p className='error-msg'>{login.errors.password}</p>
            :''}

            {responseError?<p className='error-msg'>{responseError}</p>:''}


            <Link className='text-main d-block text-end' to={'/forgetpassword'}>Forget Password?</Link>
            <button disabled={!(login.dirty && login.isValid)} 
            className='btn btn-success my-2 ms-auto d-block button ' type='submit'>
                {loading?<RotatingLines
                visible={true}
                height="25"
                width="25"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />:'login'}
                </button>
        </form>
    </div>
    </>
  )
}
