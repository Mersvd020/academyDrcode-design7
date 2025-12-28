import React from 'react'
import polygon1 from "../assets/landPagePic/Polygon.png";
import polygon2 from "../assets/landPagePic/Polygon2.png";
import footerbg from '../assets/landPagePic/footerbg.png'
import { MdEmail } from "react-icons/md";
import {FaInstagram,FaTelegramPlane,FaWhatsapp,FaPhoneAlt, FaLocationArrow, FaFacebook,} from "react-icons/fa";
import logo2 from "../assets/landPagePic/Logo2.png"
import InstaInaBtn from "../component/LandingCompsSmall/InstaInaBtn";
import {useNavigate} from "react-router-dom"


const Footer = () => {
  const navigate = useNavigate();
  return (

    <div className='w-full z-0 relative lg:h-[235px]'>
             
        <img src={polygon1} className=' absolute -z-1 -top-30 right-0'></img>
      <img src={polygon2} className=' absolute  -top-10 right-0 -z-2'></img>
          
    <div className=" text-white pt-10 h-full flex flex-col lg:flex-row lg:justify-evenly items-center lg:items-start gap-10 "
     style={{ backgroundImage: `url(${footerbg})` }} >


        <div className='lg:w-[6%] w-full relative lg:h-full  '>
      
        <div className=' absolute -top-5 lg:right-[60%] right-[8%] flex flex-col justify-center items-center gap-9  text-2xl ' >
                <InstaInaBtn />
        </div>
        </div>

        <div className="text-center order-[4] lg:w-[15%] lg:pb-0 pb-30 z-50 lg:order-[2] flex flex-col mr-20 cursor-pointer" dir='ltr' >
           <h3 className="font-semibold mb-3 text-lg -mr-35">ارتباط با ما</h3>
           <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-end gap-2">
            09115565987 <FaPhoneAlt />
          </li>
          <li className="flex items-center justify-end gap-2">
            example@gmail.com <MdEmail />
          </li>
          <li className="flex items-center justify-end gap-2">
            مازندران، ساری، بهترین مکان برای ... <FaLocationArrow/>
          </li>
        </ul>
        </div>
        


        <div className="text-center flex w-[50%]  order-[2] flex-col items-center flex-1 gap-3">
          <img src={logo2} alt="" />
          <p className="mb-4 text-sm">همین حالا اقدام کن و به ما ملحق شو</p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden w-full max-w-xs">
            <input
              type="text"
              placeholder="متن پیام شما"
              className="flex-1 p-2 text-gray-800 outline-none text-right"
            />
            <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 text-white font-semibold">
              ارسال
            </button>
          </div>
      </div>
      
      <div className="flex flex-row order-[3] justify-evenly w-[80%] lg:w-[30%]  gap-[50px] cursor-pointer">
          {[1, 2, 3].map((col) => (
            <div key={col} className=' items-center flex flex-col w-[40%]'>
              <h3 className="font-semibold mb-4 text-lg">لینک ها</h3>
              <ul className="space-y-2 text-sm">
                <li onClick={()=> navigate("/contentPage/courseContent")}>دوره ها</li>
                <li onClick={()=> navigate("/contentPage/teacherContent")}>اساتید برتر</li>
                <li onClick={()=> navigate("/contentPage/newsContent")}>خبرهای داغ</li>
                <li onClick={()=> navigate("/contentPage/teacherContent")}>اساتید برتر</li>
              </ul>
            </div>
        ))}
      </div>
     </div>
     </div>
    
  )
}

export default Footer