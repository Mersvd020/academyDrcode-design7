import React from 'react'
import { Link,Outlet } from "react-router-dom";
import {useEffect,useState} from "react"
import apiClient from '../../../hook/interceptor'; 
import axios from "axios" 
import Tele from "../../../assets/icon/telephone2.png"
import Email2 from "../../../assets/icon/email2.png"
import UserIco from "../../../assets/icon/userIco.png"
const profile = () => {

   const [user,setUser] = useState([]); 

     useEffect(()=>{
        const Userall= async()=>{
           try{
        const fechUser = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetProfileInfo");
         const Data = fechUser.data;
           setUser(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      Userall(); 
      
     },[]);
     
   console.log(user)

  return (

  <div className=' lg:h-full  w-full flex flex-row drop-shadow rounded-[32px]'>

 <div className=' w-[15%]  h-full bg-[#F5F5F5] rounded-tr-[32px] rounded-br-[32px] lg:flex hidden flex-col items-center'> 

    <div className='w-[138px] h-[130px]  bg-[url("/proimg.png")] bg-cover'></div>
    <div className=' h-[290px] '>
    <h1 className='text-[#9B0EE1] m-auto text-center whitespace-nowrap w-[70%]'>{user.fName + " " + user.lName }</h1>
    <p  className=' text-[#4B4B4B] m-auto  w-[20%] text-[10px]'>دانشجو</p>
    <div className=' mt-[30px] h-[80px] border border-b border-t border-[gray]/10 '>
       <div dir='ltr' className='m-auto text-[12px] text-gray-500 font-medium h-full  flex flex-col items-center'>
        <span className=' h-[33%] flex items-center'>{user?.phoneNumber}<img src={Tele}/></span>
        <span className=' h-[33%] flex items-center text-[10px]'>{user?.userName}<img src={UserIco}/></span>
        <span className=' h-[33%] flex items-center text-[10px]'>{user?.email}<img src={Email2}/></span>
       </div>

    </div>
    <div className=' h-[110px] mt-[15px]'>
      <p className=' text-[#4B4B4B] m-auto text-center w-[25%] text-[12px]'>درباره من</p>
      <h1 className='text-[11px] w-[80%] mx-auto'>
      {user?.userAbout?.slice(0,100)}
      </h1>
    </div>

    </div>
    <div className=' w-[90%]  flex flex-col  h-[160px] mb-[10px]' >
    <div className=' w-full flex flex-col items-center justify-center h-[70%]   bg-[url("/Precentage.png")] bg-[length:100%_100%] bg-no-repeat' >
       <div className=" w-[55px] flex items-center justify-center text-[25px] text-[#3c8b85] h-[45px]">%{user?.profileCompletionPercentage}</div>
    </div>
       <div className='h-[30%] text-center  text-[10px] flex flex-col w-full'>
        <span className='h-[40%]'>وضیعت حساب کاربری </span>
        <span className='h-[60%] text-[orange]/50'>حساب کاربری شما تکمیل نیست</span>

       </div>
    </div>
    
    </div>

<div className='lg:w-[85%] lg:mb-0 mb-20 lg:rounded-tr-[0] lg:rounded-br-[0] rounded-[32px]  bg-[white]  h-full p-3 flex flex-col'>

    
<div className=' bg-[#F5F5F5] w-full lg:h-[10%] h-[50px] rounded-t-[8px] flex flex-row gap-5 items-center lg:text-[15px] text-[10px] mt-[5px]'>

      <Link to={"/dashboard/profile/information"}  className=' mr-2 cursor-pointer font-medium' > اطلاعات شخصی </Link>
      <Link to={"/dashboard/profile/imgProfile"} className='cursor-pointer font-medium'> عکس پروفایل </Link>
      <Link to={"/dashboard/profile/address"} className='cursor-pointer font-medium'> آدرس سکونت </Link>
      <Link to={"/dashboard/profile/link"} className=' cursor-pointer font-medium '> لینک ها</Link>
      </div>
     

   
  <div className=' w-full h-[90%]'>
    <Outlet/>
    </div>

  </div>


  </div>
  )
}

export default profile