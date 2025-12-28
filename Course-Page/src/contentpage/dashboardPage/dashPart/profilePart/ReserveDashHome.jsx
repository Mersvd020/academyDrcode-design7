import React, { useEffect, useState } from "react";
import apiClient from "../../../../hook/interceptor";
// import Show from "../../../../../assets/dashPic/show.png";

const ReserveDashHome = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreReserve, setMoreReserve] = useState(false);

  const getMyReserves = async () => {
    try {
      const res = await apiClient.get("/SharePanel/GetMyCoursesReserve");
      setReserves(res.data || []);
    } catch (error) {
      console.error("❌ ERROR FETCH RESERVES:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyReserves();
  }, []);
  const currentCard = moreReserve ? reserves : reserves.slice(0, 1);

  return (
    
      <div className="bg-white flex flex-col items-center mb-5 rounded-[25px] w-full shadow-md overflow-hidden overflow-y-auto h-[150px] lg:h-[45%]">

        <div className="w-[95%] font-medium h-[35px] flex justify-between items-center text-xs px-[10px] pb-[15px] mt-2">
          <span className="text-[#9B0EE1] text-[14px]">
            جدید ترین رزرو‌ ها
          </span>

          <button onClick={() => setMoreReserve(!moreReserve)} className="text-[10px] text-[#1F96E6]">
            {moreReserve ? "مشاهده کمتر >" : "مشاهده بیشتر >"}
          </button>
        </div>

        <div className="w-full bg-[#F5F5F5] h-[30px] pb-[10px] text-gray-600 flex flex-row text-xs lg:text-sm">
          <div className="h-full mr-2 w-[45%]">عکس و نام دوره</div>
          <div className="h-full w-[25%]">نام استاد</div>
          <div className="h-full w-[30%]">وضعیت</div>
        </div>

        <div className="commentContent w-full text-[10px] lg:text-[15px] rounded-b-[25px] flex flex-col">
          {loading ? (
            <p className="text-center py-4">در حال بارگذاری...</p>
          ) : (
            currentCard.map((card) => (
              <div
                key={card.id}
                className="w-full h-[70px] text-gray-600 border-b border-gray-400/40 flex flex-row items-center"
              >
                <div className="h-full w-[35%] mr-3 flex flex-row items-center gap-2">
                  <img
                  onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover3.png"}} 
                    src={card.image  || "/cover3.png"}
                    className="rounded-[15px] h-[80%] w-[30%] object-cover"
                  />
                  <span className="text-black w-[45%] truncate">
                    {card.courseName}
                  </span>
                </div>

                <span className="w-[35%] text-center">
                  {card.teacher}
                </span>

                <span className="w-[15%] text-black">
                  {card.accept
                    ? "تایید شده"
                    : "در انتظار تایید"}
                </span>

                <span className="lg:mr-10 mr-5 cursor-pointer">
                  {/* <img className="lg:h-[15px] h-[10px]" src={Show} /> */}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
  
  );
};

export default ReserveDashHome;