import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
const AuthLayout = () => {
 const navigate = useNavigate();
    const backhome = ()=>{
      navigate("/")
    }
  return (
//  sm:w-[564px] 
//   md:w-[664px]
//  lg:w-[100%] 
//  xl:w-[100%] 
// 2xl:w-[100%] 
<div dir='ltr' className=" 
   bg-[rgb(60,139,133)]
   w-full
   h-screen
   overflow-hidden
   font-medium
   
   
 " >
    <header className=" 
     w-[90%] h-[40px]  mx-auto flex justify-between
     ">
    <div onClick={backhome} className="
    w-[50px] h-[45px]   mt-[15px] bg-[url('/leftMenu.png')] " ></div>
    <div className="
    w-[180px] h-[40px]  mt-[15px]  bg-[url('/Logo.png')] bg-[length:100%_100%]" ></div>
    </header>
    <div className="
    w-full mt-[80px] h-[90%]  bg-[url('/backgroundm.png')] bg-[length:100%_100%]
    lg:bg-[url('/background.png')] lg:bg-[length:100%_100%] lg:mt-[-45px] lg:h-[99%] lg:w-[100%]
    "> 
    <div className=" w-[100%] h-[520px] mt-[10px] flex justify-between "> {/* concent */}
     
      <Outlet />
     
    <div 
    className="hidden w-[45%] h-[100%]

    lg:block lg:bg-[url('/Image.png')] lg:bg-[length:100%_100%] lg:mt-[50px]
    "></div>

    </div>
    </div>
    
</div>
)
}

export default AuthLayout