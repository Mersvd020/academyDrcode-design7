
import React from "react";
import star from "../../../assets/landPagePic/Star.png";
import like from "../../../assets/landPagePic/Like.png";
import calender from "../../../assets/landPagePic/calender.png";
import ostad from "../../../assets/landPagePic/ostad.png";
import group from "../../../assets/landPagePic/group.png";
import {useNavigate} from "react-router-dom"

const CourseCard = ({ Id,image, title,teacher, date, price }) => {
  const navigate = useNavigate();
    const productDetailHandler = ()=>{
       navigate(`/contentPage/courseDetail/${Id}`)
      //  window.location.reload();
    }
  return (
    <div key={Id} className="relative w-full max-w-xs rounded-3xl overflow-hidden h-96 shadow-[0_0_10px_rgba(168,85,247,0.5)] border-4 border-white">
      <img src={image} onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover3.png"}} className="w-full h-full object-cover" alt="" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div className="flex justify-end" dir="ltr">
          <img src={like} alt="<3" className="cursor-pointer" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <img src={star} alt="" />
          </div>
        <div className="flex items-center gap-1">
          <img src={ostad} alt="" /> {teacher} <img src={group} alt="" /> 20 دانشجو
        </div>
          <p className="text-sm text-white/80 flex gap-1">
            <img src={calender} alt="" /> {date} (شروع)
          </p>

          <div className="flex items-center justify-between" dir="ltr">
            <button onClick={productDetailHandler} className="px-6 py-2 rounded-full border border-white/50 text-sm hover:bg-white hover:text-black transition-colors">
              مشاهده دوره
            </button>
            <span className="text-sm text-white/70 flex gap-1 justify-center items-center" dir="rtl">
              {price} تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;