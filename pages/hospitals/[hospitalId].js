import React from 'react'
import router from 'next/router';


export const getStaticPaths=async()=>{
    const res =await fetch("http://localhost:5000/Hospitals");
    const data=await res.json();

    const paths=data.map((c)=>{
        return{
            params:{
                hospitalId:c.id.toString()
            }
        }
    })
    return{
     paths:paths,
     fallback:false
    }
  }

  export const getStaticProps=async(context)=>{
    const id=context.params.hospitalId
    const res =await fetch(`http://localhost:5000/Hospitals/${id}`);
    const data1=await res.json();
    return{
      props:{data1}
    }
  }


export default function hospitalId({data1}) {
  return (
    <div>
        <h1 className='text-center m-3'>Doctor Avilable In {data1.hospitalName}</h1>
    <div  style={{textAlign:"center",alignItems:"center",display:"flex", alignItems:"center" ,flexWrap:"wrap"}}>
        {
   
   data1.Doctors.map((c)=>{
    return <>
<div className="card mt-3 mb-3" style={{width:"300px" ,margin:"auto",height:"450px"}}>
<img src={c.dImgPath} className="card-img-top" alt={c.name+" Image"}  style={{height:"200px"}}/>
<div className="card-body">
  <h5 className="card-title">{c.name}</h5>
  <h5 className='card-subtitle mb-2 text-body-secondary'>{c.practicePeriod}</h5>
  <p className="card-text">{c.education}</p>
  <p className="card-text">{c.specilization}</p>

  <button className="btn btn-primary w-full" onClick={()=>router.push(`/hospital/${c.name}`)}>Book Appointment</button>
</div>
</div>
    </>
   })
  
 }
 </div>
    </div>
  )
}
