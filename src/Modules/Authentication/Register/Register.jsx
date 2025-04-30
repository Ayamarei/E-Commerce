import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import * as yup from 'yup'


export default function Register() {

  let user={
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}

  const navigate= useNavigate()
  const [isLoading, setIsLoading] = useState(false)

async function sendForm (value){
  setIsLoading(true)
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value).then((res)=>{
    console.log(res);
    toast.success(res.data.message)
    setIsLoading(false)
    navigate("/login")
  }).catch((error)=>{
    console.log("error",error);
    toast.error(error.response.data.message)
    setIsLoading(false)
    
  })
}
 
  let registerForm= useFormik({
    initialValues:user,
    onSubmit:sendForm,
    // validate:function(allData){
    //   const errors ={}
    //   const nameRegex =/^[A-Z][a-z]{2,9}$/
    //   const phoneRegex =/^(20)?01[0125][0-9]{8}$/
    //   if (! nameRegex.test(allData.name)) {
    //     errors.name ="Name must  start with cabital letter and contain at least 3 charcter "
    //   }
    //   if (! phoneRegex.test(allData.phone)) {
    //     errors.phone ="Invalid phone number  "
    //   }
    //   if (allData.email.includes("@")==false ||allData.email.includes(".com")) {
    //     errors.email ="Invalid email   "
    //   }
    //   if (allData.password.length<6||allData.password.length>12) {
    //     errors.password ="Password must be at least 6 charcters    "
    //   }
    //   if (allData.rePassword!==allData.password) {
    //     errors.rePassword ="Password and rePassword dosn`t match    "
    //   }
    //   console.log(errors);
      

    //   return errors
    // },

    validationSchema:yup.object().shape({
      name:yup.string().min(3,"Name must be at least 3 charecter").max(12,"Max must at 12 charecter").required("Name is required"),
      email:yup.string().email("Invalie email").required("Email is required"),
      phone:yup.string().matches(/^(20)?01[0125][0-9]{8}$/,"Invalid phone number").required("Phone is required"),
      password:yup.string().min(6,"password must be at least 6 charecter").max(12,"Max must at 12 charecter").required("Password is required"),
      rePassword:yup.string().required("rePassword is required").oneOf([yup.ref("password")],"rePassword don't match")
    })
  })

  return (
    < >
    <div className="content">
      <div className="container">
        <div className="w-75 mx-auto my-4 ">
          <form onSubmit={registerForm.handleSubmit}>
            <h2>Register Now : </h2>
            <div className='mb-3'>
              <label className='d-block' htmlFor="name">Name:</label>
              <input  value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='w-100 rounded-3 p-1 mt-1 ' type="text" id='name'/>
              {registerForm.errors.name && registerForm.touched.name? <span className='text-danger'>{registerForm.errors.name}</span>:""}
            </div>
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
            <div className='mb-3'>
              <label className='d-block' htmlFor="rePassword">RePassword:</label>
              <input  value={registerForm.values.rePassword} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='w-100 rounded-3 p-1 mt-1 ' type="password" id='rePassword'/>
              {registerForm.errors.rePassword && registerForm.touched.rePassword?<span className='text-danger'>{registerForm.errors.rePassword}</span>:""}
            </div>
            <div className='mb-3'>
              <label className='d-block' htmlFor="phone">Phone:</label>
              <input  value={registerForm.values.phone} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} className='w-100 rounded-3 p-1 mt-1 ' type="tel" id='phone'/>
              {registerForm.errors.phone && registerForm.touched.phone?<span className='text-danger'>{registerForm.errors.phone}</span>:""}
            </div>
            <div className='d-flex justify-content-end'>
            <button type='submit' className='btn btn-success '>{isLoading?(<>Register... <ClipLoader color="#fff"size={20}/></>) :"Register"} </button>
            </div>
          </form>
        </div>
      </div>
    </div>


    </>
  )
}
