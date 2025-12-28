import React from 'react'
import Navbar from "../component/Navbar";
import Hero from "../component/landing/Hero"
import StatsSection from '../component/landing/Stats';
import Footer from "../component/footer"
import News from '../component/landing/news';
import TeachersSlideLanding from '../component/landing/TeachersSlideLanding'
import CourseSlide from '../component/landing/CourseSlide';//
import UsSlider from '../component/landing/UsSlider';//
import QuikAction from "../component/quickAction"
import {useState} from "react"

const landingPage =()=> {
 
  const[nightMode,setNightMode] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen ${nightMode ? "bg-[black]": " bg-gray-50"} overflow-x-hidden`}>
      <QuikAction
        setNightMode={setNightMode}
        nightMode={nightMode}
      />
      
      <main className="flex-grow">
        <Navbar nightMode={nightMode} setNightMode={setNightMode} />
        <Hero />
        <StatsSection nightMode={nightMode} />
        <CourseSlide nightMode={nightMode} />
        <TeachersSlideLanding nightMode={nightMode} />
        <div className='lg:block hidden'><UsSlider nightMode={nightMode} /></div>
        <News nightMode={nightMode} />
      </main>
      <Footer/>
      
    </div>
  );
}

export default landingPage;