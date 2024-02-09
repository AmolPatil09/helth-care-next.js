import React from 'react'
import router from 'next/router'
import { useState,useEffect } from 'react'
import { CgPassword, CgProfile } from 'react-icons/cg';

const data = [
  {
    id:1,name:"Home",url:"/home"
  },
  {
    id:2,name:"Find Doctor",url:"/hospitals"
  },
  {
    id:3,name:"Appointments",url:"/myAppointment"
  },
  {
    id:4,name:"About",url:"/about"
  },
  {
    id:5,name:"Contact",url:"/contact"
  }
]
export default function hi() {
  
  const [brouserWidth,setBrouserWidth]=useState(0);
  const [showMobMenu,setShowMobMenu]=useState(false);
  const [isLogin,setIsLogin]=useState(false);
  const [isRegister,setIsRegister]=useState(false);
  useEffect(()=>{
    const handleResize=()=>{
      setBrouserWidth(window.innerWidth)
    }
    setBrouserWidth(window.innerWidth)
  window.addEventListener('resize',handleResize)
 
  return ()=>{
    window.removeEventListener('resize',handleResize)
  }
  },[])
  useEffect(() => {
   localStorage.getItem('userName')?setIsLogin(true): setIsLogin(false)
   
   
  });
  // console.log(localStorage);
  return (
<>
     {
      isLogin?<div className='navbar container-fluid  w-full  h-[70px] md-[80px] bg-black flex item-center justify-between z-20 
      transition-transform duriation-3000 '>
         
        <h2  className='w-[40px] md:w-[60px] mx-[5vw] text-white'>CareHealth</h2>
        
      
      {  (brouserWidth>900)? <div className='item-align-center text-center '>
        
            <ul className='navbar  '>
          {
            data.map((c)=>{
             return <li key={c.id} ><button onClick={()=>router.push(c.url)}  className='text-white m-2  no-underline'><b>{c.name}</b></button></li>
  
    
            })
           
          }
          <li> <button className='text-white mx-2 'onClick={()=>{
            router.push('/login'),setIsLogin(false),localStorage.clear(),setShowMobMenu(false)}}><b>Logout</b></button> </li>
       <button className='mx-4 text-white' onClick={()=>router.push('/profile')} ><CgProfile style={{height:"30px",width:"30px"}}/></button>
       
            </ul>
         
  
        </div>:<div className='item-align-right'>
        <div  style={{display:"flex"}}>
        {showMobMenu&& <button className='text-white mx-3'  onClick={()=>router.push('/profile')}  ><CgProfile style={{height:"30px",width:"30px"}}/></button> }
        <img src='/more.jpg' className='text-white mr-2' style={{height:"30px",width:"30px"}}
        
        onClick={showMobMenu?()=>{setShowMobMenu(false)}:()=>{setShowMobMenu(true)}}
        
        />
        </div>
      
        </div>
        
        
        
        }
  
       
      </div>:<div className='navbar container-fluid  w-full  h-[70px] md-[80px] bg-black flex item-center justify-between z-20 
      transition-transform duriation-3000 '>
         
        <h2 src='/favicon.ico' className='w-[40px] md:w-[60px] mx-[5vw] text-white'>CareHelth</h2>
        
       <ul className='navbar mx-3'>
        {isRegister? <li><button  className='text-white  no-underline m-1' onClick={()=>{router.push('/login'),setIsRegister(false)}}><b>Login</b></button></li>:<li> <button className='text-white m-1'onClick={()=>{router.push('/register'),setIsRegister(true)}}><b>Register</b></button> </li>}
        
       
        </ul>
      </div>
     }
    
    <div>
      {console.log(showMobMenu)}
      {showMobMenu&&(isLogin&&<ul className='bg-black text-white  '>
      
      {
        data.map((c)=>{
         return <li key={c.id} ><button onClick={()=>router.push(c.url)}  className='text-white m-2  no-underline'><b>{c.name}</b></button></li>


        })
        
      }
     <li> <button className='text-white mx-2 'onClick={()=>{
            router.push('/login'),setIsLogin(false),localStorage.clear(),setShowMobMenu(false)}}><b>Logout</b></button> </li>
      
        </ul>)
       }
      </div>
    </>
  )
}
