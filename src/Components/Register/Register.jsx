import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'

import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup'

const mySchema = yup.object ({
    name:yup.string().required().min(2).max(20),
    email:yup.string().email().required(),
    phone:yup.string().required().matches(/^(01)[0125][0-9]{8}$/,"Please enter an egyptian valid number"),
    password:yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Minimum eight characters, at least one letter and one number'),
    rePassword:yup.string().required().oneOf([yup.ref("password")],"password doesn't match")

});





export default function Register() {
    let navigate =useNavigate();
    let [loading,setLoading]=useState(false)

    let [responseError,setResponseError] =useState('')
    async function signUp(userData){

        setLoading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
        .then((data)=>{
            setResponseError('')
            if(data.data.message==='success'){
                
                navigate('/login')
                toast.success(`Welcome ${userData.name}`,{
                    icon:<i className="fa-regular fa-face-grin-stars  fs-3"></i>,
                    theme:'colored'
                })
                
            }
            
        })
        .catch((error)=>{
            setResponseError(error?.response?.data?.message)
            
        })
        setLoading(false)
    }


    const Register = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
        },
    onSubmit: function(values){
        signUp(values)
    },
    validationSchema: mySchema,


    })


    
  return (
    <>



    <div className="container w-75 my-5 py-5">
        <h2>Register Now:</h2>
        <form onSubmit={Register.handleSubmit} >
            <label htmlFor="name">Name:</label>
            <input 
            onChange={Register.handleChange} 
            onBlur={Register.handleBlur} 
            value={Register.values.name} 
            className='form-control' type="text" name="name" id="name" />
            {Register.errors.name && Register.touched.name? 
            <p className='error-msg'>{Register.errors.name}</p>
            :''}

            <label htmlFor="email">Email:</label>
            <input 
            onChange={Register.handleChange} 
            onBlur={Register.handleBlur} 
            value={Register.values.email} 
            className='form-control' type="email" name="email" id="email" />
            {Register.errors.email && Register.touched.email? 
            <p className='error-msg'>{Register.errors.email}</p>
            :''}

            <label htmlFor="phone">Phone Number:</label>
            <input 
            onChange={Register.handleChange} 
            onBlur={Register.handleBlur} 
            value={Register.values.phone} 
            className='form-control' type="text" name="phone" id="phone" />
            {Register.errors.phone && Register.touched.phone? 
            <p className='error-msg'>{Register.errors.phone}</p>
            :''}

            <label htmlFor="password">Password:</label>
            <input 
            onChange={Register.handleChange} 
            onBlur={Register.handleBlur} 
            value={Register.values.password} 
            className='form-control' type="password" name="password" id="password" />
            {Register.errors.password && Register.touched.password? 
            <p className='error-msg'>{Register.errors.password}</p>
            :''}

            <label htmlFor="rePassword">Confirm Password:</label>
            <input 
            onChange={Register.handleChange} 
            onBlur={Register.handleBlur} 
            value={Register.values.rePassword} 
            className='form-control' type="password" name="rePassword" id="rePassword" />
            {Register.errors.rePassword && Register.touched.rePassword? 
            <p className='error-msg'>{Register.errors.rePassword}</p>
            :''}

            {responseError?<p className='error-msg'>{responseError}</p>:''}
            <button disabled={!(Register.dirty && Register.isValid)} 
            className='btn button my-2 ms-auto d-block' type='submit'>
                {loading?<RotatingLines
                    visible={true}
                    height="25"
                    width="25"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />:'Register'}
                
            
            </button>
        </form>
    </div>
    </>
  )
}
