import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import apiClient from "../../hook/interceptor"
import Slider from "rc-slider"
import Like from "../../assets/icon/like.png"
import Dislike from "../../assets/icon/dislike.png"
import emptyStar from "../../assets/icon/emptyStar.png"
import Pen from "../../assets/landPagePic/pen.png"
import Star from "../../assets/icon/Star.png"
import Price from "../../assets/icon/price.png"
import teach1 from "../../assets/teacherAvatar/t1.png"
import Student from "../../assets/icon/student.png"
import Category from "../../assets/icon/cat.png"
import PicIco from "../../assets/icon/Education.png"
import Calender from "../../assets/icon/calender.png"
// import CommentImg from "../../assets/icon/comment.png"
// import ProductCard from "../../component/course/productCard.jsx"
// import Out from "../../assets/icon/out.png"
// import Send from "../../assets/icon/send.png"
import Favorite from "../../assets/icon/favorite.png"
import toast from "react-hot-toast"


const ShowReservedDetail = ({ id, setShowCourseDetail }) => {
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
//  console.log("courseData",courseData)
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/News/${id}`);
                console.log("Course Details:", response.data);
                setCourseData(response.data.detailsNewsDto);
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

            fetchCourseDetails();
    }, [id]);
/////////////////////////////////////////////////////////
  const [rating, setRating] = useState(0);
   const [Rated, setRated] = useState(false); 
    const[like,setLike] = useState(false);
    const[dissLike,setDissLike] = useState(false);

/////////////////////fav
const [favStatus, setFavStatus] =  useState(false);

useEffect(() => {
  const ratedUserStr = localStorage.getItem('rateUser');
  // const rateNumStr = localStorage.getItem('ratenum');
  const FavStr = localStorage.getItem('fav');
  
  const ratedUser = ratedUserStr ? JSON.parse(ratedUserStr) : {};
  // const rateNum = rateNumStr ? JSON.parse(rateNumStr) : {};
  const Fav = FavStr ? JSON.parse(FavStr) : {};
  
  if (id && ratedUser[id]) {
    setRated(true);
    
    // setRating(rateNum[id] || 0);
  }
  if(id && Fav){
    setFavStatus(true);
  }
  
  // console.log("rateNum:", rateNum);
  // console.log("ratedUser:", ratedUser);
}, [id]);





 const favHandlerNews = async () => {
  if(favStatus){
    try {
    const fetchFav = await apiClient.delete(
      `https://sepehracademy.liara.run/News/DeleteFavoriteNews`,
      {
        deleteEntityId: id,
      })
      toast.success("از لیست علاقه مندی ها حذق شد")
  } catch(error) {
    toast.error("خطا")
  }
  }
  else{
  try {
     console.log(favStatus)
    const fetchFav = await apiClient.post(
      `https://sepehracademy.liara.run/News/AddFavoriteNews?NewsId=${id}`);
      console.log("با موفقیت به علاقه مندی ها اضافه شد");

        
    toast.success("اخبار با موفقیت به علاقه مندی ها اضافه شد")
    const Fav = JSON.parse(localStorage.getItem('fav') || '{}');
    Fav[id] = true
    localStorage.setItem('fav', JSON.stringify(Fav));
     setFavStatus(true);
    setTimeout(()=>{window.location.reload()},1500);

  } catch(error) {
    toast.error("خطا")
  }
  }
}

  
////////////////rating

  const navigate = useNavigate();
    const productDetailHandler = ()=>{
       navigate(`/contentPage/newsDetail/${id}`)
       window.location.reload();
    }
/////////////////////

//////////////////like/disslike

const likeHandler = async ()=>{
  try {
    const courseAddLike = await apiClient.post(
      `https://sepehracademy.liara.run/News/NewsLike/${id}`
    );
     setLike(!like);
     toast.success("لایک اضافه شد")
    setTimeout(()=>{window.location.reload()},1500)
  } catch (error) {
    console.error('خطا', error);
  }

 
}

const dissLikeHandler = async ()=>{
   try {
    const courseAddDissLike = await apiClient.post(
      `https://sepehracademy.liara.run/News/NewsDissLike/${id}`
    );
    toast.success("دیسلایک اضافه شد")
    setTimeout(()=>{window.location.reload()},1500)
    setDissLike(!dissLike);
  } catch (error) {
    console.error('خطا', error);
  }
  

}

 
  const[moreCourse,setMoreCourse] = useState(false);





    ////////////////////////////////////

    if (loading) {
        return (
            <div className="lg:w-[850px] w-[90%] max-h-[90vh] overflow-y-auto drop-shadow rounded-[25px]
                  lg:absolute fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 shadow-lg shadow-gray-300">
                <div className="flex justify-center items-center h-[200px]">
                    <span className="text-gray-500">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

   
    return (
        <>
            <div className="lg:w-[600px] w-[95%]  h-[550px] drop-shadow rounded-[25px]
                  lg:absolute fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:p-2 z-50 shadow-lg shadow-gray-300
                  flex flex-col items-center"
                  dir="rtl">

                 <div className=" w-[95%] h-[10%] flex flex-row justify-between items-center">
                    <div className="text-[20px] font-medium">جزییات</div>
                    <button onClick={()=>setShowCourseDetail('')}  className="font-medium  gap-2 w-[50px] text-center text-red-300 text-[13px] border hover:bg-gray-200 rounded-[5px]">بستنx</button>
                 </div>
                 <div className=" w-[95%] h-[50%] flex flow-row flex-wrap">
                      <div className="relative h-[80%] w-full">
                                 <img 
                                   src={courseData?.currentImageAddress || courseData?.currentImageAddressTumb  || "/Img.png"}
                                   onError={(e) => (e.currentTarget.src = "/Img.png")}
                                   className="h-full w-full rounded-[25px]"
                                 ></img>
                                 <button onClick={favHandlerNews} className={`flex justify-center border border-[gray] hover:bg-[red] ${favStatus === true ? 'bg-[red]' : '' } items-center absolute lg:top-10 lg:right-10 right-5 top-5 lg:w-12 lg:h-12 h-6 w-6   backdrop-blur-sm rounded-full`}>
                                   <img src={Favorite}/>
                                 </button>
                     
                               </div>
                               
                               <div className=" w-full flex h-[10%] items-center gap-4 text-sm flex-wrap justify-between">
                     
                                    <button onClick={productDetailHandler} className="border border-[white]-2 rounded-[45px] p-2 text-white bg-[#9B0EE1]/80 hover:bg-[#9B0EE1]">مشاهده جزییات</button>   
                                      
                       
                                     <div className="flex items-center gap-3 text-sm text-gray-700">
                                       <span>از دوره راضی بودی؟</span>
                                       
                                       
                                       <button onClick={()=>{likeHandler()}} className="flex items-center gap-1 hover:text-green-600 transition">
                                         <span className="text-lg"><img src={Like}/></span>
                                         <span className="font-medium">{courseData ? courseData?.currentLikeCount : "0"}</span>
                                       </button>
                                       
                                       
                                       <button onClick={()=> dissLikeHandler()} className="flex items-center gap-1 hover:text-red-600 transition">
                                         <span className="text-lg"><img src={Dislike}/></span>
                                         <span className="font-medium">{courseData ? courseData?.currentDissLikeCount : "0"}</span>
                                       </button>
                                     </div>
                                     
                               </div>
                 </div>
                 <div className=" w-[95%] h-[40%] flex flex-col ">
                    <div className=" w-full h-[20%] flex flex-row ">
                       
                       <div className=" h-[full] w-[50%] ">
                        <div className="w-[95%] h-[40px] flex flex-row gap-10 place-items-center "><span className="flex items-center gap-1"> قیمت</span><span className="flex flex-row gap-3 place-items-center h-[40px] items-center text-[15px]"><p className="text-purple-500">تومان</p></span></div>
                       </div>
                       <div className=" h-[full] w-[50%] relative flex items-center p-5 ">
                         <Slider
                         min={0}
                         max={100}
                         value={70}
                         // onChange={setCapicity}
                         trackStyle={{
                           backgroundColor: "#2C8C88",
                           height: 8,
                         }}
                         railStyle={{
                           backgroundColor: "#d1d5db",
                           height: 8,
                         }}
                         handleStyle={{
                           borderColor: "#2C8C88",
                           backgroundColor: "#2C8C88",
                           display: "none",
                           height: 16,
                           width: 16,
                           marginTop: -6,
                         }}
                         className="flex-1 mt-2"
                       />
                 
                       <span className="text-[12px] text-teal-700 font-medium absolute top-[2px] right-[75px]">
                         {70}
                       </span>
                       </div>
                    </div>
                    <div className=" w-full h-[40%]">
                        <p className=' text-[#4B4B4B]  font-bold w-[25%] text-[12px]'>توضیحات مختصر</p>
                        <h1 className='text-[12px] font-medium'>
                        {courseData?.describe?.slice(0,100)}
                        </h1>
                    </div>
                    <div  className=" w-full h-[40%]  flex flex-row lg:text-[15px] text-[10px] font-medium ">
                      <span className="h-full  w-[30%] flex flex-row items-center justify-center "><img src={Pen} className="w-[15px] h-[15px] ml-1"/>{courseData?.addUserFullName}</span>
                      <span className="h-full  w-[30%] flex flex-row items-center justify-center"><img src={Student} className="w-[15px] h-[15px] ml-1"/>{` ${courseData?.currentView} `}بازدیدکننده</span>
                      <span className="h-full  w-[40%] flex flex-row items-center lg:text-[12px] "><span className="flex items-center gap-1"> <img src={Calender}/>تاریخ     </span> <div className=" pr-5 lg:whitespace-nowrap lg:pr-3"><span>{courseData?.insertDate?.slice(0,10)}</span>{"------>"}<span>{courseData?.updateDate?.slice(0,10)}</span></div></span>
                    </div>
                    
                 </div>
               

            </div>
        </>
    )
}

export default ShowReservedDetail;