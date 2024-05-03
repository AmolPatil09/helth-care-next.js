import React from 'react'
import { useState } from 'react';
import router from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function login() {

var[formData,setFormData]=useState({
      userName:"",
      password:""
  })
  
  var[formDataError,setFormDataError]=useState({
   userNameError:"",
   passwordError:""
  })

  var[formDataButton,setFormDataButton]=useState({
   userNameButton:"",
   passwordButton:""
  })
  var[message,setMesseges]=useState({
   errorMessage:"",
   successMessage:""
    
})
console.log(message.successMessage);
const handleChange=(e)=>{
   setFormData((pre)=>{
    return{...pre,[e.target.name]:e.target.value}
   },validate(e.target.name,e.target.value)) 
}

const validate=(name ,value)=>{
    if (name == "userName") {
      const namePattern = /^[a-z]+[@][a-z]{3,7}(.com||.in)$/
      if (value == "") {
        setFormDataError((pre) => {
          return { ...pre, userNameError:"Enter user name"}
        })
        setFormDataButton((pre) => {
          return { ...pre, userNameButton: false }
        })
      }
      else if (!(value.toString().match(namePattern))) {
        setFormDataError((pre) => {
          return { ...pre, userNameError: "Enter User Name abccn@jdnkjds.com or dsfg@sghj.in" }
        })
        setFormDataButton((pre) => {
          return { ...pre, userNameButton: false }
        })
      }
      else {
        setFormDataError((pre) => {
          return { ...pre, userNameError: "" }
        })
        setFormDataButton((pre) => {
          return { ...pre, userNameButton: true }
        })
      }
    }
    else  if (name == "password") {
      const namePattern = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/
      if (value == "") {
        setFormDataError((pre) => {
          return { ...pre, passwordError:"Enter Password"}
        })
        setFormDataButton((pre) => {
          return { ...pre, passwordButton: false }
        })
      }
      else if (!(value.toString().match(namePattern))) {
        setFormDataError((pre) => {
          return { ...pre, passwordError: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"}
        })
        setFormDataButton((pre) => {
          return { ...pre, passwordButton: false }
        })
      }
      else {
        setFormDataError((pre) => {
          return { ...pre, passwordError: "" }
        })
        setFormDataButton((pre) => {
          return { ...pre, passwordButton: true }
        })
      }
    }

}

const submitData=(e)=>{
   e.preventDefault()
   console.log(formData);
   axios.post('https://helthcaredata.onrender.com/User',formData)
     .then(function (response) {
       setMesseges((pre)=>{
      return {...pre,successMessage:"Login Successfull"}
       })
       localStorage.setItem("userName",formData.userName)
       localStorage.setItem("password",formData.password)
      
     },
     setTimeout(() => {
      router.push("/home") 
     },1000),)
     .catch(function (error) {
       setMesseges((pre)=>{
         return {...pre,errorMessage:"Server Not Respond"}
        
          })
          
     });
}

  return (
    <div className='align-item-center container' style={{height:"700px"}}>
   
   <div style={{alignItems:"center",display:"flex", alignItems:"center" ,flexWrap:"wrap", margin:"auto", marginTop:"80px"}}>
   
    <div className='bg-white mt-5' style={{width:"350px", height:"auto",border:"",borderRadius:"25px",margin:"auto"}}>
     <h2 className='text-center bg-black text-white' style={{borderTopLeftRadius:"25px",borderTopRightRadius:"25px", height:"50px"}} >Login</h2>
    <form className='container mb-3 mt-3' >
    <div>
        <label className='mt-3'>Username</label>
        <input
        className='form-control'
        type="text"
        name="userName"
        required
        onChange={handleChange}
        />
        {formDataError.userNameError && <div className='text-danger'>{formDataError.userNameError}</div>}
     </div>

     <div>
     <label  class="form-label mt-3">Password</label>
    <input type="password" 
     class="form-control"
     name="password"
     required
     onChange={handleChange}
      aria-describedby="passwordHelpBlock"
      />
      {formDataError.passwordError && <div className='text-danger'>{formDataError.passwordError}</div>}
    
    
     </div>
     <div>
        <button className='btn btn-success form-control mt-2' onClick={submitData}
        disabled={!(formDataButton.userNameButton && formDataButton.passwordButton)}>Login</button>
        {message.errorMessage && <div className='text-success text-center'>{message.errorMessage}</div>}
        {message.successMessage && <div className='text-success text-center'>{message.successMessage}</div>}
        <div className='text-center'><Link href='/register' >New user register Please</Link></div>
     </div>
    </form>
    </div>
    

<div className='bg-white text-center' style={{width:"300px", height:"300px",border:"",borderRadius:"25px",margin:"auto"}}>
  <img src='./drlogo.jpg' className="card-img-top mt-3" alt=""  style={{height:"250px"}}/>
  <h2>Welcome CareHealth</h2>
  <h3>We Care of Your Health</h3>
    </div>
    </div>
    </div>
  
  )
}
