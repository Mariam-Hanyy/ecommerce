import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import * as yup from 'yup'
import { baseURL } from '../BaseURL/BaseUrl'
import { useNavigate } from 'react-router-dom'



let myschema =yup.object({
    resetCode:yup.string().matches(/^[0-9]{6}$/,'code must be 6 numbers').required('verification code is required')
})

export default function ResetCode() {

    let [loading,setLoading]=useState(true)
    
    const [responseError,setResponseError]=useState('')
    const navigate=useNavigate()

    async function codeVerification (resetcode){
        setLoading(false)
        return await axios.post(`${baseURL}/api/v1/auth/verifyResetCode`,resetcode)
        .then(data=>{
            setLoading(true)
            navigate('/createpass')
            setResponseError('')
        })
        .catch(error=>{
            setLoading(true)
            setResponseError(error.response.data?.message)

        })
        
    }

    let verifyCode= useFormik({
        initialValues:{
            resetCode:''
        },
        onSubmit:(values)=>{
            codeVerification(values)
        },
        validationSchema: myschema

    })


    return (
        <>

       

        <div className='container w-25 text-center my-5 py-5'>
            <h3>Verification Code</h3>
            <form onSubmit={verifyCode.handleSubmit}>
            <input type="text" id='resetCode' name='resetCode' className='form-control mb-1'
            onChange={verifyCode.handleChange}
            onBlur={verifyCode.handleBlur}
            value={verifyCode.values.resetCode}
            />  
            {verifyCode.errors.resetCode && verifyCode.touched.resetCode? 
                <p className='error-msg'>{verifyCode.errors.resetCode}</p>
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
                    />:'Verify Code'}
                </button>
          </form>
    
        </div>
      
        </>
    )
}
