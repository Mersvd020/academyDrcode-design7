import "../../assets/style/tailwinds/NewsStyle.css"
import {useNavigate} from "react-router-dom"
import {useEffect,useState} from "react"

import Image from "../../assets/cardImg/cover1.png"
import toast from "react-hot-toast"

import Favorite from "../../assets/icon/Heart.png"
import Star from "../../assets/icon/Star.png"
import Education from "../../assets/icon/Education.png"
import Calender from "../../assets/icon/Calender.png"
import Vector from "../../assets/icon/Vector.png"
import Pen from "../../assets/landPagePic/pen.png"
import Eye from "../../assets/landPagePic/eye.png"
import apiClient from "../../hook/interceptor"


const NewsCard = ({price,id,name,like,category,teacher,Img,view,miniDescribe,newsCatregoryName}) => {

    

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
   <div key={id} className="productCard shadow-md shadow-purple-200 ">
   
    <img src={Img} onError={(e) => (e.currentTarget.src = "/cover3.png")}  className="Image "/>
    
    <button onClick={()=>favHandlerNews(id)} className={`favorite hover:bg-[red] ${favStatus === true ? 'bg-[red]' : '' } `}>
       <img className=" w-[18px] h-[18px] m-[auto]" src={Favorite}/>
       </button>
   
   
    <div className="info">
   
       <div className="intro">
        <h4 className="name">{name}</h4>
        <span className="star">{like}<img src={Star}/></span>
       </div>
   
       <div className="teacherInfo">
        <p className="title">
        {miniDescribe}
            </p>
        
        <span className="teacher"><img src={Pen}/>{teacher}</span>
         
       </div>
   
           <div className="detail">
           <span className="student"><img src={Eye} className="w-5 h-4"/>{`(${view})بازدید کننده`}</span>
           <button onClick={productDetailHandler} className="detailBt">بیشتر بخوانید</button>       
          </div> 
   
      </div>
   
              
     </div>
  );
};

export default NewsCard;