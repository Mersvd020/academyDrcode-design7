import React, { useState, useEffect } from 'react'
import vect from "../../assets/landPagePic/vect.png"
import vect2 from "../../assets/landPagePic/vect2.png"
import TitleLanding from './reusableComps/titleLanding'
import CourseCard from './reusableComps/CourseCard'
import bg4 from '../../assets/landPagePic/bg4.png'
import left from '../../assets/landPagePic/left.png'
import right from '../../assets/landPagePic/right.png'
import { useNavigate } from "react-router-dom"
import apiClient from "../../hook/interceptor"
import Squre3 from "../../assets/landPagePic/Squre3.png"
const CourseSlide = ({nightMode}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get(
          "/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10&SortingCol=Active&SortType=DESC&TechCount=0"
        );
        
        console.log("api data:", response.data);

        setCourses(response.data.courseFilterDtos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 3.5
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3.5
  }

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, courses.length - slidesPerView)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev >=  maxIndex ? 0 : prev + 1))
  }

  const totalDots = maxIndex + 1

  const navigate = useNavigate();
  const more = () => {
    navigate("/contentPage/courseContent")
  }

  if (loading) return <p>Loading courses...</p>

  return (
    <section className='flex flex-col w-[90%] mt-20 m-auto gap-12 justify-center items-center m-20 relative'>
      <TitleLanding nightMode={nightMode}
        title="با هر دوره، یک قدم جلوتر"
        image1={vect}
        image2={vect2}
        text="همه چیز را در دوره‌های ما یاد بگیرید"
      />

      <div className='w-full  px-8 overflow-hidden'>
        <div 
          className='flex transition-transform duration-500 ease-in-out gap-10'
          style={{
            transform: `translateX(${currentIndex * (100 / slidesPerView + (slidesPerView > 1 ? 10 / slidesPerView : 0))}%)`
          }}
        >
          {courses.map((course, index) => (
            <div 
              key={index}
              className='flex-shrink-0'
              style={{ width: `calc(${100 / slidesPerView}% - ${(10 * (slidesPerView - 1)) / slidesPerView}px)` }}
            >
              <CourseCard
                 Id={course.courseId}
                 key={course.courseId}
                image={course.imageAddress || "/cover3.png"}
                title={course.title}
                teacher={course.teacherName}
                date={course.startTime}
                price={course.cost}
              />
            </div>
          ))}
        </div>
      </div>

      <div dir='ltr' className='flex  items-center justify-between px-16 py-6 w-screen'>
        <button 
          onClick={more} 
          className='text-purple-700 mr-5 px-6 py-2 rounded-lg border-2 border-purple-700 text-md hover:bg-purple-700 hover:text-white transition-colors'
        >
          بیشتر ببین
        </button>
        
        <div dir="rtl" className='flex gap-2'>
          {Array.from({ length: totalDots }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                index === currentIndex ? 'bg-purple-700 w-8' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        
        <div className='flex flex-wrap gap-3'>
          <img 
            src={left} 
            alt="Previous" 
            className='cursor-pointer hover:opacity-70'
            onClick={handlePrev}
          />
          <img 
            src={right} 
            alt="Next"
            className='cursor-pointer hover:opacity-70'
            onClick={handleNext}
          />
        </div>
      </div>
      <img src={Squre3} alt="" className="absolute -left-20 -top-10 md:block hidden" />
    </section>
  )
}

export default CourseSlide
