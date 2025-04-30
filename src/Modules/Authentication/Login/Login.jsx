import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { authContext } from '../../Context/AuthContext'


export default function Login() {
 const {setToken}=  useContext(authContext)

  let user={
   
    email:"",
    password:"",
   
}

  const navigate= useNavigate()
  const [isLoading, setIsLoading] = useState(false)

async function sendForm (value){
  setIsLoading(true)
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value).then((res)=>{
    toast.success(res.data.message)
    setToken(res.data.token)
    localStorage.setItem("tkn",res.data.token)
    setIsLoading(false)
    navigate("/products")

  }).catch((error)=>{
    console.log("error",error);
    toast.error(error.response.data.message)
    setIsLoading(false)
    
  })
}
 
  let registerForm= useFormik({
    initialValues:user,
    onSubmit:sendForm,
    
    validationSchema:yup.object().shape({
      
      email:yup.string().email("Invalie email").required("Email is required"),
      password:yup.string().min(6,"password must be at least 6 charecter").max(12,"Max must at 12 charecter").required("Password is required"),
     
    })
  })

  return (
    < >
    <div className="content">
      <div className="container">
        <div className="w-75 mx-auto my-4 ">
          <form onSubmit={registerForm.handleSubmit}>
            <h2>Login Now : </h2>
           
            <div className='mb-3'>
              <label className='d-block' htmlFor="email">Email:</label>
              <input  value={registerForm.values.email} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='w-100 rounded-3 p-1 mt-1 ' type="email" id='email'/>
              {registerForm.errors.email && registerForm.touched.email?<span className='text-danger'>{registerForm.errors.email}</span>:""}
            </div>
            <div className='mb-3'>
              <label className='d-block' htmlFor="password">Password:</label>
              <input  value={registerForm.values.password} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='w-100 rounded-3 p-1 mt-1 ' type="password" id='password'/>
              {registerForm.errors.password && registerForm.touched.password?<span className='text-danger'>{registerForm.errors.password}</span>:""}
            </div>
           
            <div className='d-flex justify-content-end'>
            <button type='submit' className='btn btn-success '>{isLoading?(<>Login... <ClipLoader color="#fff"size={20}/></>) :"Login"} </button>
            </div>
          </form>
        </div>
      </div>
    </div>


    </>
  )
}
