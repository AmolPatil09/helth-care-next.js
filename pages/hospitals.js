import React from 'react'
import router from 'next/router';

export const getStaticProps=async()=>{
  const res =await fetch("https://helthcaredata.onrender.com/Hospitals");
  const data=await res.json();
  return{
    props:{data}
  }
}
export default function hospitals({data}) {

  return (
    <>
    <h1 className='w-full text-center '>Hospitals Avilable</h1>
    <div  style={{textAlign:"center",alignItems:"center",display:"flex", alignItems:"center" ,flexWrap:"wrap"}}>
    {
   
     data.map((c)=>{
      return <>
  <div className="card mt-3 mb-3" style={{width:"350px",margin:"auto",height:"450px"}}>
  <img src={c.imgPath} className="card-img-top" alt={c.hospitalName+" Image"}  style={{height:"200px"}}/>
  <div className="card-body">
    <h5 className="card-title">{c.hospitalName}</h5>
    <h5 className='card-subtitle mb-2 text-body-secondary'>{c.located}</h5>
    <p className="card-text">{c.objective}</p>
    <button className="btn btn-primary w-full" onClick={()=>router.push(`/hospitals/${c.id}`)}>Book Appointment</button>
  </div>
</div>
      </>
     })
    
   }
   </div>
    </>
    
    
  )
}


