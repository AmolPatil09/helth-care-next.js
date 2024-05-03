import React from 'react'
import { useState } from 'react'
import router from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function register() {
   var [formData, setFormData] = useState({
      name: "",
      emailId: "",
      contactNo: "",
      password: ""

   })
   console.log(formData);
   var [formDataError, setFormDataError] = useState({
      nameError: "",
      emailIdError: "",
      contactNoError: "",
      passwordError: ""
   })
   var [formDataButton, setFormDataButton] = useState({
      nameButton: false,
      emailIdButton: false,
      contactNoButton: false,
      passwordButton: false
   })


   var [message, setMesseges] = useState({
      errorMessage: "",
      successMessage: ""

   })

   const handleChange = (e) => {
      setFormData((pre) => {
         return { ...pre, [e.target.name]: e.target.value }
      },
         validate(e.target.name, e.target.value))
   }
   const validate = (name, value) => {
      if (name == "emailId") {
         const namePattern = /^[a-z]+[@][a-z]{3,7}(.com||.in)$/
         if (value == "") {
            setFormDataError((pre) => {
               return { ...pre, emailIdError: "Enter email Id" }
            })
            setFormDataButton((pre) => {
               return { ...pre, emailIdButton: false }
            })

         }
         else if (!(value.toString().match(namePattern))) {
            setFormDataError((pre) => {
               return { ...pre, emailIdError: "Enter email as abccn@jdnkjds.com or dsfg@sghj.in" }
            })
            setFormDataButton((pre) => {
               return { ...pre, emailIdButton: false }
            })

         }
         else {
            setFormDataError((pre) => {
               return { ...pre, emailIdError: "" }
            })
            setFormDataButton((pre) => {
               return { ...pre, emailIdButton: true }
            })

         }
      }
      else if (name == "name") {
         const namePattern = /[A-Za-z\s]+/
         if (value == "") {
            setFormDataError((pre) => {
               return { ...pre, nameError: "Please Enter  Name" }
            })
            setFormDataButton((pre) => {
               return { ...pre, nameButton: false }
            })

         }
         else if (!(value.toString().match(namePattern))) {
            setFormDataError((pre) => {
               return { ...pre, nameError: "Name content only alphabate" }
            })
            setFormDataButton((pre) => {
               return { ...pre, nameButton: false }
            })


         }
         else {
            setFormDataError((pre) => {
               return { ...pre, nameError: "" }
            })
            setFormDataButton((pre) => {
               return { ...pre, nameButton: true }
            })


         }
      }
      else if (name == "password") {
         const namePattern = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/
         if (value == "") {
            setFormDataError((pre) => {
               return { ...pre, passwordError: "Enter Password" }
            })
            setFormDataButton((pre) => {
               return { ...pre, passwordButton: false }
            })


         }
         else if (!(value.toString().match(namePattern))) {
            setFormDataError((pre) => {
               return { ...pre, passwordError: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" }
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
      else if (name == "contactNo") {
         if (value == "") {
            setFormDataError((pre) => {
               return { ...pre, contactNoError: "Enter Contact No" }
            })
            setFormDataButton((pre) => {
               return { ...pre, contactNoButton: false }
            })

         }
         else if ((value.length > 10 || value.length < 10)) {
            setFormDataError((pre) => {
               return { ...pre, contactNoError: "Contact No should be 10 digit" }
            })
            setFormDataButton((pre) => {
               return { ...pre, contactNoButton: false }
            })

         }
         else {
            setFormDataError((pre) => {
               return { ...pre, contactNoError:"" }
            })
            setFormDataButton((pre) => {
               return { ...pre, contactNoButton:true }
            })

         }
      }

   }

   const submitData = (e) => {
      e.preventDefault()
      console.log(formData);
      axios.post('https://helthcaredata.onrender.com/User', formData)
         .then(function (response) {
            setMesseges((pre) => {
               return { ...pre, successMessage: "Registration Successfull" }
            })
         },
            setTimeout(() => {
               router.push("/login")
            }, 1000))
         .catch(function (error) {
            setMesseges((pre) => {
               return { ...pre, errorMessage: "Some error occured" }

            })

         });
   }
   return (
      <div className='align-item-center container' style={{ height: "900px" }}>

         <div style={{ alignItems: "center", display: "flex", alignItems: "center", flexWrap: "wrap", margin: "auto", marginTop: "100px" }}>

            <div className='bg-white' style={{ width: "350px", height: "auto", border: "", borderRadius: "25px", margin: "auto" }}>
               <h2 className='text-center bg-black text-white' style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px", height: "50px" }} >Register</h2>
               <form className='container mb-3 mt-3' >
                  <div>
                     <label className='mt-3'>Name</label>
                     <input
                        name="name"
                        className='form-control'
                        type="text"
                        required
                        onChange={handleChange}
                     />
                     {formDataError.nameError && <div className='text-danger'>{formDataError.nameError}</div>}
                  </div>
                  <div>
                     <label className='mt-3'>Email Id</label>
                     <input
                        name="emailId"
                        className='form-control'
                        type="text"
                        required
                        onChange={handleChange}
                     />

                     {formDataError.emailIdError && <div className='text-danger'>{formDataError.emailIdError}</div>}
                  </div>


                  <div>
                     <label className='mt-3'>Contact No</label>
                     <input
                        className='form-control'
                        name="contactNo"
                        type="number"
                        required
                        onChange={handleChange}
                     />
                     {formDataError.contactNoError && <div className='text-danger'>{formDataError.contactNoError}</div>}


                  </div>

                  <div>
                     <label class="form-label mt-3">Password</label>
                     <input type="password"
                        className="form-control"
                        name="password"
                        required="true"
                        onChange={handleChange}
                        aria-describedby="passwordHelpBlock"
                     />
                     {formDataError.passwordError && <div className='text-danger'>{formDataError.passwordError}</div>}


                  </div>
                  {console.log(formDataButton.nameButton+" email "+formDataButton.emailIdButton+" contact" +formDataButton.contactNoButton + " password"+formDataButton.passwordButton)}                  <div>
                     <button className='btn btn-success form-control mt-2' onClick={submitData}
                        disabled={!(formDataButton.nameButton && formDataButton.emailIdButton && formDataButton.contactNoButton && formDataButton.passwordButton)}>Register</button>
                     {message.errorMessage && <div className='text-success text-center'>{message.errorMessage}</div>}
                     {message.successMessage && <div className='text-success text-center'>{message.successMessage}</div>}
                     <div className='text-center'><Link href='/login' >Allredy user Login Please</Link></div>
                  </div>
               </form>
            </div>


            <div className='bg-white text-center' style={{ width: "300px", height: "450px", border: "", borderRadius: "25px", margin: "auto" }}>
               <img src='./drlogo.jpg' className="card-img-top mt-3" alt="" style={{ height: "300px" }} />
               <h2>Welcome CareHealth</h2>
               <h3>We Care of Your Health</h3>
            </div>
         </div>
      </div>

   )
}
