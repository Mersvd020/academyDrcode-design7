import React, { useState, useEffect } from 'react';
import TitleLanding from './reusableComps/titleLanding';
import vect3 from "../../assets/landPagePic/vect3.png";
import vect4 from "../../assets/landPagePic/vect4.png";
import polygon3 from "../../assets/landPagePic/Polygon3.png";
import left from '../../assets/landPagePic/left.png';
import right from '../../assets/landPagePic/right.png';
import TeacherCard from './reusableComps/TeacherCard';
import polygon4 from "../../assets/landPagePic/polygon4.png";
import apiClient from "../../hook/interceptor";
import Squre4 from "../../assets/landPagePic/Squre4.png"
const TeachersSlideLanding = ({nightMode}) => {

  const [teachers, setTeachers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    apiClient
      .get("Home/GetTeachers")
      .then(res => {
        // console.log("Teachers API:", res.data);

        const mapped = res.data.map((t, index) => ({
          id: t.teacherId,
          name: t.fullName,
          title: t.courseCounts > 0 ? ` مدرس ${t.courseCounts} دوره` : "مدرس",
          image: t.pictureAddress || polygon4,
          polygon: polygon4
        }));

        setTeachers(mapped);
      })
      .catch(err => {
        console.log("Teacher fetch error:", err);
      });
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + teachers.length) % teachers.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % teachers.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleTeachers = () => {
    if (teachers.length === 0) return [];

    const visible = [];
    for (let i = -1; i <= 4; i++) {
      const index = (currentIndex + i + teachers.length) % teachers.length;
      visible.push({
        teacher: teachers[index],
        isSelected: i === 0,
        position: i
      });
    }
    return visible;
  };

  const visibleTeachers = getVisibleTeachers();

  return (
    <section className='flex flex-col gap-12 justify-center items-center m-20 relative'>
      <TitleLanding 
      nightMode={nightMode}
        title="با هر استاد ، یک موفقیت"
        image1={vect3}
        image2={vect4}
        text="با برترین استادان جهان آشنا شو"
      />

      <img src={polygon3} alt="" className='absolute left-35' />

      <div className="hidden md:block relative w-full overflow-hidden px-8" dir='ltr'>
        <div className="flex justify-center items-center gap-6">
          {visibleTeachers.map((item, idx) => (
            <div
              key={`${item.teacher.id}-${idx}`}
              className={`transition-all duration-700 ${
                item.isSelected ? 'scale-100 opacity-100' : 'scale-75 opacity-90'
              }`}
            >
              <TeacherCard nightMode={nightMode}
                image={item.teacher.image}
                teacherName={item.isSelected ? item?.teacher?.name : undefined}
                title={item.isSelected ? item.teacher.title : undefined}
                polygon={item.isSelected ? item.teacher.polygon : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='md:hidden flex flex-col gap-6 items-center'>
        {teachers.slice(0, 2).map((t, id) => <TeacherCard nightMode={nightMode} key={id} {...t} />)}
      </div>

      <div dir='ltr' className='md:flex hidden gap-10 px-16 py-6 w-screen'>
        <div className='flex flex-wrap gap-3'>
          <img src={left} onClick={handlePrevious} className="cursor-pointer" />
          <img src={right} onClick={handleNext} className="cursor-pointer" />
        </div>

        <div className='flex gap-2'>
          {teachers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex ? 'w-8 h-3 bg-purple-600' : 'w-3 h-3 bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
      <img src={Squre4} alt="" className=" absolute -right-20 top-0"/>
    </section>
  );
};

export default TeachersSlideLanding;
