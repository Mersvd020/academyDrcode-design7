import React from "react";
import logo from '../assets/landPagePic/Logo.png';
import HomeIco from "../assets/navIco/Home.png"
import TeacherIco from "../assets/navIco/Teacher.png"
import NewsIco from "../assets/navIco/News.png"
import NightModeIco from "../assets/navIco/NightMode.png"
import SearchIco from "../assets/icon/SearchIcon.png"
import Profile from "../assets/icon/Profile.png"
import Avatar from "../assets/navIco/avatar.png"
import Calen from "../assets/icon/Newss.png"
import {Link} from "react-router-dom"

// import{useContext} from "react"
// import { AuthContext } from "../hook/authContext";

import {useSelector} from "react-redux"


function Navbar({setNightMode,nightMode}) {

    // const {authenticated} = useContext(AuthContext);

    const {user,isAuthenticated} = useSelector(
      (state)=> state.auth
    );
    
  return (
    <>
    <nav className=" w-[85%]  h-[20px] hidden lg:block  top-0 right-0 left-0  flex items-center justify-between mt-5 mb-10 z-500 rounded "></nav>

    <nav className=" relative lg:fixed m-auto  bg-transparent lg:w-[86%] w-full top-0 backdrop-blur p-2 rounded-[15px] right-0 left-0  flex items-center  justify-between lg:flex-row flex-row-reverse mt-5 mb-10 z-500 rounded ">
      
  <div className="lg:w-32 w-[70%]">
    <img src={logo} alt="Logo" className="w-32 h-auto" />
  </div>

    
        <ul className=" lg:flex hidden p-2 rounded-[10px] mr-8 gap-10 text-gray-700 font-medium">
          <Link to="/"><li className="relative cursor-pointer hover:text-purple-600 after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300">
            خانه
          </li></Link>
          <Link to="/contentPage/courseContent"><li className="relative cursor-pointer hover:text-purple-600 after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300">
            دوره‌ها
          </li></Link>
          <Link to="/contentPage/newsContent"><li className="relative cursor-pointer hover:text-purple-600 after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300">
            اخبار و مقالات
          </li></Link>
          <Link to="/contentPage/teacherContent"><li className="relative cursor-pointer hover:text-purple-600 after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300">
            اساتید
          </li></Link>
          <li className="relative cursor-pointer hover:text-purple-600 after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300">
            ارتباط با ما
          </li>
        </ul>
        
        <div className="flex flex-row h-full items-center">
        {isAuthenticated ?(
         <Link to="/dashboard" className=" w-[50px] h-[50px] rounded-full cursor-pointer"><img src={Avatar} className="w-full h-full" /></Link>  
        ):( 
          <Link to="/authLayout"><button  className="  bg-purple-600 text-white lg:px-4 px-2 lg:ml-0 mr-2 ml-5 py-2 rounded-lg hover:bg-purple-700 transition-all cursor-pointer">
          ورود / ثبت‌ نام
          </button></Link>
          ) }

        </div>
        
        
    </nav>


    <nav className="w-full z-500 text-[white] h-[50px] bg-[#9B0EE1] fixed lg:hidden bottom-[0] ">
        <ul dir="ltr" className=" flex justify-evenly h-full items-center  text-gray-700 font-medium">
          <Link to="/"><li className="relative  after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-[white] hover:after:w-full after:transition-all after:duration-300">
            <img src={HomeIco} />
          </li></Link>
          <Link to="/contentPage/teacherContent"><li className="relative  after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-[white] hover:after:w-full after:transition-all after:duration-300">
             <img src={TeacherIco} />
          </li></Link>
          <li className="relative c after:content-[''] rounded-full border p-2 mb-10 bg-[#9B0EE1] border-[white] border-2">
             <img src={SearchIco} />
          </li>
          <Link to="/contentPage/courseContent"><li className="relative   after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-[white] hover:after:w-full after:transition-all after:duration-300">
            <img src={NewsIco} />
          </li></Link>
          <li onClick={()=> setNightMode(!nightMode)} className="relative  after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-0 after:h-[2px] after:bg-[white] hover:after:w-full after:transition-all after:duration-300">
            <img src={NightModeIco} />
          </li>
        </ul>
    </nav>

    </>
  );
}

export default Navbar;