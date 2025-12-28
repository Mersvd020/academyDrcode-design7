import "../../assets/style/tailwinds/tailwindSt(productCard).css"
import {useNavigate} from "react-router-dom"
import {useEffect,useState} from "react"
import Image from "../../assets/cardImg/cover1.png"
import toast from "react-hot-toast"
import Favorite from "../../assets/icon/Heart.png"
import Star from "../../assets/icon/Star.png"
import Education from "../../assets/icon/Education.png"
import Calender from "../../assets/icon/Calender.png"
import Vector from "../../assets/icon/Vector.png"
import apiClient from "../../hook/interceptor"
import { FaSleigh } from "react-icons/fa"

const productCard = ({id,price,like,name,teacher,category,sortBy,date,Img})=>{

 const navigate = useNavigate();
    const productDetailHandler = ()=>{
       navigate(`/contentPage/courseDetail/${id}`)
       window.location.reload();
    }
        
    const [favStatus, setFavStatus] =  useState(false);

   useEffect((Id) => {
  const FavStr = localStorage.getItem('fav');
  const Fav = FavStr ? JSON.parse(FavStr) : {};
   
}, [id]);

     const favHandler = async (Id) => {
  try {
    
   
    const fetchFav = await apiClient.post(
      "https://sepehracademy.liara.run/Course/AddCourseFavorite",{
       courseId: Id,
      }
    );
    toast.success("دوره با موفقیت به علاقه مندی ها اضافه شد")
    setFavStatus(true);
    
    
     
  } catch(error) {
    console.error("خطا در افزودن به علاقه مندی", error.response?.data || error);
    console.log("وضعیت", error.response?.status);
    toast.error("خطا")
  }
}
     
return(
 <div key={id} className="productCard shadow-md shadow-purple-200 ">

 <img src={Img} onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover5.png"}} className="Image"/>
 
 <button  onClick={()=>favHandler(id)} className={`favorite hover:bg-[red] ${favStatus === true ? 'bg-[red]' : '' } `}>
    <img className=" w-[18px] h-[18px] m-[auto] " src={Favorite}/>
    </button>


 <div className="info">

    <div className="intro">
     <h4 className="name">{name}</h4>
     <span className="star">{like}<img src={Star}/></span>
    </div>

    <div className="teacherInfo">
     <span className="teacher"><img src={Education}/>{teacher}</span>
     <span className="student"><img src={Vector}/>دانش آموز</span>
      <div className="date">
        <img src={Calender}/> {date?.slice(0,10)}
      </div>
    </div>

        <div className="detail">
        <span className="price">{price}<p className="text-purple-500">تومان</p></span>
        <button onClick={productDetailHandler} className="detailBt">مشاهده دوره</button>       
       </div> 

   </div>

           
  </div>

    )
}
export default productCard