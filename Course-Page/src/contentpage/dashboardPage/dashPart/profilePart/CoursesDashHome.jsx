import React, { useState, useEffect } from 'react'
import apiClient from '../../../../hook/interceptor'
import Show from "../../../../assets/icon/show.png"

const CoursesDashHome = () => {
  const [currentCard, setCurrentCard] = useState([]);
  const [moreCourse, setMoreCourse] = useState(false);

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      try {
        const res = await apiClient.get("/SharePanel/GetMyFavoriteCourses");
        const data = res.data.favoriteCourseDto || [];

        const normalized = data.map(item => ({
          id: item.id,
          title: item.courseTitle || item.course?.title,
          price: item.cost || item.course?.cost,
          teacher: item.teacheName || `${item.course?.teacher?.fName} ${item.course?.teacher?.lName}`,
          image: item.imageAddress || item.course?.imageAddress,
        }));

        setCurrentCard(normalized);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchFavoriteCourses();
  }, []);

  const displayedCards = moreCourse ? currentCard : currentCard.slice(0, 2);

  return (
    <div className="bg-white flex flex-col items-center rounded-[25px] w-full shadow-md overflow-hidden overflow-y-auto h-[200px] lg:h-[58%]">

      <div className="w-[95%] font-medium h-[35px] flex justify-between items-center text-xs px-[10px] pb-[15px] mt-2">
        <span className="text-[#9B0EE1] text-[14px]">
          جدیدترین دوره ها
        </span>
        <button onClick={() => setMoreCourse(!moreCourse)} className="text-[10px] text-[#1F96E6]">
          {moreCourse ? "مشاهده کمتر >" : "مشاهده بیشتر >"}
        </button>
      </div>

      <div className="w-full bg-[#F5F5F5] h-[30px] pb-[10px] text-gray-600 flex flex-row text-[10px] lg:text-[13px]" dir="rtl">
        <div className="h-full mr-2 w-[45%]">عکس و نام دوره</div>
        <div className="h-full w-[25%]">نام استاد</div>
        <div className="h-full w-[30%]">قیمت</div>
      </div>

      <div className="commentContent w-full whitespace-nowrap text-[10px] lg:text-[15px] flex flex-col rounded-b-[25px]" dir="rtl">
        {displayedCards.length === 0 ? (
          <p className="text-center p-4">دوره مورد علاقه‌ای وجود ندارد</p>
        ) : (
          displayedCards.map((cardi) => (
            <div key={cardi.id} className="w-full h-[70px] text-[gray]/70 border-b border-[gray]/50 flex flex-row items-center">
              
              <div className="h-full w-[35%] mr-3 flex flex-row items-center">
                <img src={cardi.image || "/cover3.png"} onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover3.png"}}  className="rounded-[15px] h-[80%] w-[30%]" alt="course" />
                <span className="text-black w-[45%]">{cardi.title}</span>
              </div>

              <span className="w-[35%] text-center">{cardi.teacher}</span>

              <span className="w-[15%] text-black">{cardi.price} <span className="text-[gray]/70">تومان</span></span>


            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesDashHome;