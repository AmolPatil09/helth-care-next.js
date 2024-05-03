import React from 'react'
import router from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export const getStaticProps=async()=>{
  const res =await fetch("https://helthcaredata.onrender.com/Appointment");
  const data=await res.json();
  return{
    props:{data}
  }
}
  

export default function myAppointment({data}) {
  var [message, setMesseges] = useState({
    errorMessage: "",
    successMessage: ""
  
  })
  const deleteData=(id)=>{
    alert("Do you wan't cancel Appointment")
    axios.delete(`https://helthcaredata.onrender.com/Appointment/${id}`)
      .then(function (response) {
        setMesseges((pre)=>{
       return {...pre,successMessage:"Cancel Appointment Successfully"}
        })
      },
       router.push("/myAppointment") )
      .catch(function (error) {
        setMesseges((pre)=>{
          return {...pre,errorMessage:"Some Error Occured"}
         
           })
           
      });
  }
  return (
    <div style={{height:"565px"}}>
    <h1 className='w-full text-center m-3'>Your Appointment</h1>
    <div  style={{textAlign:"center",alignItems:"center",display:"flex", alignItems:"center" ,flexWrap:"wrap"}}>
    {
   
     data.map((c)=>{
      return <>
  <div className="card mt-3 mb-3" style={{width:"350px",margin:"auto",height:"200px"}}>
  <div className="card-body">
    <h5 className="card-title">Appointment to {c.doctorName}</h5>
    <h5 className='card-subtitle mb-2 text-body-secondary'>Date:{c.date}</h5>
    <h5 className='card-subtitle mb-2 text-body-secondary'>Time:{c.time}</h5>
    <h5 className='card-subtitle mb-2 text-body-secondary'>Petiont Name:{c.petiontName}</h5>
    <button className="btn btn-danger w-full" onClick={()=>{deleteData(c.id)}}>Cancel Appointment</button>

  </div>
</div>
      </>
     })
    
   }
   </div>
    </div>
  )
}
