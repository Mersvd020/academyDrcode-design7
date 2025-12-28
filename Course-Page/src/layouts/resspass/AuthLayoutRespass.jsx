import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'

 const AuthLayoutRespass = () => {
   const navigate = useNavigate();
   const backhome = ()=>{
     navigate("/")
   }
  return (
//       sm:w-[564px] 
//  md:w-[664px]  
//  lg:w-[1000px] lg:h-[500px lg:mx-auto]
//  xl:w-[1200px] xl:h-[550px] xl:mx-auto
//  2xl:w-[1400px] 2xl:h-[600px] 2xl:mx-auto
// w-[444px] h-[550px] 
    <div dir='ltr' className=" 
 bg-[rgb(255,255,255)]
   w-full
   h-screen
   overflow-hidden
   font-medium

 " >
    <header className=" 
     w-[90%] h-[40px]  mx-auto flex justify-between
     ">
    <div onClick={backhome} className="
    w-[50px] h-[45px]  mt-[15px] bg-[url('/leftMenu.png')]" ></div>
    <div className="
    w-[180px] h-[40px] mt-[15px]  bg-[url('/Logo.png')] bg-[length:100%_100%]" ></div>
    </header>
    <div className=" w-[100%] h-[520px] mt-[10px]  "> {/* concent */}
     <div 
    className=" p-[1px] w-full lg:w-[70%] h-full mx-auto  bg-[url('/ImageRes.png')] bg-[length:100%_100%]
    ">
          <Outlet />    
    </div>

    </div>

    
</div>
)
}

export default AuthLayoutRespass