import React, { useState } from 'react'
import router from 'next/router'



export default function home() {

 
  return (
    <>

    <div className='h-[590px] text-center' style={{textAlign:"center",alignItems:"center",display:"flex", alignItems:"center" ,flexWrap:"wrap"}}>
    <div className='bg-white text-center' style={{ width: "350px", height: "450px", border: "", borderRadius: "25px", margin: "auto" }}>
               <img src='./drlogo.jpg' className="card-img-top " alt="" style={{ height: "300px" }} />
               <h1>Welcome CareHealth</h1>
               <h3>We Care of Your Health</h3>
               <button className='btn btn-primary mt-3' onClick={()=>router.push(`/hospitals`)}>Book Appointment</button>
            </div>
    
    </div>
    </>
  )
}
