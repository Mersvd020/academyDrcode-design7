import React from "react";
import student from "../../assets/landPagePic/studentHero.png"
import zoom from "../../assets/landPagePic/zoom.png"

function Hero() {
  return (
    <section className="flex lg:flex-row flex-col  items-center w-[90%] m-auto lg:ml-3" dir="ltr">
      <div className="relative lg:w-1/2 w-full flex justify-end items-center ">
        <div className="relative z-10  lg:w-[750px] lg:h-[820px] flex items-center justify-center">
          <p className="text-gray-500"><img src={student} alt="student" className="w-full h-auto  object-cover" /></p>
        </div>


      </div>

      <div className=" flex flex-col w-full mb-5 items-start justify-center gap-6" dir="rtl">
        <h1 className="text-4xl font-extrabold text-gray-800">
          آکادمی <span className=" text-green-600">دکتر کد</span>
        </h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          با ما به دنیای جذاب کدنویسی وارد شوید و مهارت‌های لازم برای ساختن نرم‌افزارهای نوآورانه را یاد بگیرید.
        </p>


        <div className=" lg:flex hidden items-center border-2 border-purple-500 rounded-full overflow-hidden w-full max-w-md">
          <input
            type="text"
            placeholder="جستجوی هر آنچه در آکادمی هست..."
            className="w-full  px-4 py-2 focus:outline-none text-gray-700"
          />
          <button className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition">
            <img src={zoom} alt="🔍" className="relative top-0 right-0 w-10 object-fill" />
          </button>
        </div>
        
      </div>
    
    </section>
    
    
    
  );
}


export default Hero;