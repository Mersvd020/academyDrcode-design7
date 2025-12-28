import React from "react";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react"
import toast from "react-hot-toast"
import Pen from "../../../assets/landPagePic/pen.png";
import Eye from "../../../assets/landPagePic/eye.png";
import Star from "../../../assets/icon/Star.png";
import Favorite from "../../../assets/icon/Heart.png";
import star from "../../../assets/icon/Star.png";
import like from "../../../assets/landPagePic/Like.png";
import calender from "../../../assets/landPagePic/calender.png";
import ostad from "../../../assets/landPagePic/ostad.png";
import group from "../../../assets/landPagePic/group.png";


const NewsCard = ({ id, title,miniDescribe,author ,image, views, rate }) => {
  

  // const openDetail = () => {
  //   navigate(`/contentPage/newsDetail/${id}`);
  // };

   const navigate = useNavigate();
    const productDetailHandler = ()=>{
       navigate(`/contentPage/newsDetail/${id}`)
       window.location.reload();
    }
        

    const [favStatus, setFavStatus] =  useState(false);

  useEffect(() => {
  const FavStr = localStorage.getItem('fav');

  const Fav = FavStr ? JSON.parse(FavStr) : {};
  
}, [id]);


 const favHandlerNews = async (Id) => {
  try {
    
    const fetchFav = await apiClient.post(
      `https://sepehracademy.liara.run/News/AddFavoriteNews?NewsId=${Id}`);

     toast.success("اخبار با موفقیت به علاقه مندی ها اضافه شد")
       setFavStatus(true);
      // const Fav = JSON.parse(localStorage.getItem('fav') || '{}');
      // Fav[Id] = true
      // localStorage.setItem('fav', JSON.stringify(Fav));
      //  setFavStatus(true);
      // setTimeout(()=>{window.location.reload()},1500);
        
  } catch(error) {
    console.error("خطا در افزودن به علاقه مندی", error.response?.data || error);
    console.log("وضعیت", error.response?.status);
    toast.error("خطا")
  }
}


  return (
    <div key={id} className="relative w-full lg:w-[300px] h-[400px] max-w-xs rounded-3xl overflow-hidden h-96 shadow-[0_0_10px_rgba(168,85,247,0.5)] border-4 border-white">
         <img src={image || "/cover5.png"} onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover5.png"}} className="w-full h-full object-cover" alt="" />
   
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
   
         <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
           <div className="flex justify-end" dir="ltr">
             <img src={like} alt="<3" className="cursor-pointer" />
           </div>
   
           <div className="space-y-4">
             <div className="flex  items-center gap-2 justify-between">
               <h3 className="text-xl font-bold">{title}</h3>
               <div className="flex flex-row items-center gap-1">{Math.ceil(rate)}<img className="w-[20px] h-[20px]" src={star} alt="" /></div>
             </div>
             <p>{miniDescribe}</p>
             <p className="text-sm text-white/80 flex gap-1">
               <img src={Pen} alt="" />{author}
             </p>
   
             <div className="flex items-center justify-between" dir="ltr">
               <button onClick={productDetailHandler} className="px-6 py-2 rounded-full border border-white/50 text-sm hover:bg-white hover:text-black transition-colors">
                 مشاهده دوره
               </button>
               <span className="text-[15px] text-white/70 flex gap-1 justify-center items-center" dir="rtl">
               <img src={Eye} />{views}<p className="text-[12px]">بازدیدکننده</p>
               </span>
             </div>
           </div>
         </div>
       </div>
  );
};

export default NewsCard;