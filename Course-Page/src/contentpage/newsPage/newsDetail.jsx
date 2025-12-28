import { useParams , useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import apiClient from "../../hook/interceptor.js"
import PicIco from "../../assets/icon/Education.png"
import Like from "../../assets/icon/like.png"
import Dislike from "../../assets/icon/dislike.png"
import emptyStar from "../../assets/icon/emptyStar.png"
import Star from "../../assets/icon/Star.png"
import CommentImg from "../../assets/icon/comment.png"
import HandleSpecs from "../../component/handleSpecs.jsx"
import Img from "../../assets/cardImg/Img3.png"
import NewsCard from "../../component/news/newsCard.jsx"
import Out from "../../assets/icon/out.png"
import Send from "../../assets/icon/send.png"
import "../../assets/style/tailwinds/newsStyle.css"
import Favorite from "../../assets/icon/favorite.png"
import author2 from "../../assets/teacherAvatar/t2.png"
import NewsIco from  "../../assets/icon/news.png"
import Category from "../../assets/icon/cat.png"
import Calender from "../../assets/icon/calender.png"
import Pen from "../../assets/icon/pen.png"
import Eye from "../../assets/icon/eye.png"
import Link from "../../assets/icon/link.png"
import toast from "react-hot-toast"

const newsDetail = () => {
  
  const[showMore,setShowMore] = useState(false);
  const[showMore2,setShowMore2] = useState(false);  



///////////////////////////////////////////////

 const {id} = useParams();
  
 ///////////////////////////////////////////////////

  const [News, setNews] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState([]);
 

   useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await axios.get("https://sepehracademy.liara.run/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC");
        const data = await response.data.news;
        setNews(data);
      } catch (error) {
        console.error('خطا:', error);
      }
    }
    
    fetchRelated();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await axios.get(`https://sepehracademy.liara.run/News/${id}`);
        const data = await response.data.detailsNewsDto;
        setSelectedNews(data);
      } catch (error) {
        console.error('خطا:', error);
      }
    
    }
     
    fetchRelated();
  }, [id]);

  // console.log(News)

   useEffect(()=>{
   console.log("selectedNews",selectedNews);
  },[selectedNews])
  
  
   
 
   
    
  //relatedNews
  useEffect(()=>{
    
       const related = News.filter((el) => el.newsCatregoryId === selectedNews.newsCatregoryId).slice(0,5);
      setRelatedNews(related);
      // console.log("relatedNews",related);
  },[selectedNews])
 
   
  ///////////////////////////////////////////////////
  const [rating, setRating] = useState(0);
   const [Rated, setRated] = useState(false); 
    const[like,setLike] = useState(false);
    const[dissLike,setDissLike] = useState(false);
 useEffect(() => {
  setRating(selectedNews?._count?.newsRate ?? 0);
}, [selectedNews]);
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



  const handleRating = async (rate) => {
   if (Rated) {
      console.log("قبلاً امتیاز داده‌اید");
    toast.error("شما قبلاً امتیاز داده‌اید");
    return;
  }
    
  try {
    const courseRate = await apiClient.post(
      `https://sepehracademy.liara.run/News/NewsRate?NewsId=${id}&RateNumber=${rate}`
    );
    
    console.log('امتیاز:', rate);
    toast.success('امتیاز شما با موفقیت ثبت شد');
   
    const ratedUser = JSON.parse(localStorage.getItem('rateUser') || '{}');
   
    
    ratedUser[id] = true;
    
    
    localStorage.setItem('rateUser', JSON.stringify(ratedUser));
  
    
    setRated(true);
  
    setTimeout(()=>{window.location.reload()},1500);
  } catch (error) {
    console.error('خطا:', error);
    toast.error("شما قبلا امتیاز دادید")
  }
  
};
/////////////////////

//////////////////like/disslike

const likeHandler = async ()=>{
  try {
    const courseAddLike = await apiClient.post(
      `https://sepehracademy.liara.run/News/NewsLike/${selectedNews.id}`
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
      `https://sepehracademy.liara.run/News/NewsDissLike/${selectedNews.id}`
    );
    toast.success("دیسلایک اضافه شد")
    setTimeout(()=>{window.location.reload()},1500)
    setDissLike(!dissLike);
  } catch (error) {
    console.error('خطا', error);
  }
  

}

 
  const[moreCourse,setMoreCourse] = useState(false);

///////////////////////////////////////////////////

 const [showReplies, setShowReplies] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});

  const toggleReplyForm = (commentId) => {
  setShowReplyForm(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
};

  const toggleReplies = (commentId) => {
  setShowReplies(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
};



  const [replyText, setReplyText] = useState('');

  const [Comment,setComment]= useState([]);
  const[Reply,setReply]= useState([]);
  const[addcommentForm,setAddCommentForm] = useState(false);
  const[addcommentReplyForm,setAddCommentReplyForm] = useState(false);
  ///////////////////////////////////////////
  const [likes, setLikes] = useState(20);
  const [dislikes, setDislikes] = useState(2);
  const [userVote, setUserVote] = useState(null);

   

     useEffect(()=>{
       const commentHandler = async ()=>{
        try{
           const fetchComment = await axios.get(`https://sepehracademy.liara.run/News/GetNewsComments?NewsId=${id}`);
           setComment(fetchComment.data);
             console.log("fetchComment",fetchComment.data);
        }catch(error){
          console.log("مشکل در بارگذاری کامنت",error);
        }
         
       }
       commentHandler();
      
        
     },[id])

     


    
      useEffect(()=>{
       const ReplyHandler = async ()=>{
        try{
           const fetchReply =  await Promise.all(
            Comment.map(async el =>
             apiClient.get(`https://sepehracademy.liara.run/News/GetRepliesComments?Id=${el.id}`),
              ) 
               );
           

           const allReplies = fetchReply.reduce((acc, r) => [...acc, ...r.data], []);
             setReply(allReplies);
          // console.log("fetchReply",allReplies);

        }catch(error){
          console.log("مشکل در بارگذاری پاسخ کامنت",error);
        }
        
       }
        ReplyHandler()
        
     },[Comment])
  // console.log("reply",Reply)


 const addCommentHandler = async () => {
  try {
  
    const addComment = await apiClient.post("https://sepehracademy.liara.run/News/CreateNewsComment",{
      newsId : id,
      userIpAddress : "1.1.1.1",
      title : replyText,
      describe : replyText,
      userId : selectedNews.userId
    });
   
    
    console.log("کامنت ثبت شد", addComment.data);
    setReplyText('');
    toast.success("کامنت ثبت شد")
    setTimeout(()=>{window.location.reload()},1500)
  } catch(error) {
    console.log("خطا در کامنت رخ داده", error);
  } finally {
    setAddCommentForm(false);
  }
}
// console.log("id",id);
// console.log("replyText:",replyText);

const addCommentReplyHandler = async (Cid) => {
  try {
    const commentRep = Comment.find(el => el.id === Cid);
    console.log(commentRep.userId)
    console.log(commentRep.parentId)
    console.log(id)
    const addCommentReply = await apiClient.post("https://sepehracademy.liara.run/News/CreateNewsReplyComment",{
      newsId: id,
      userIpAddress: "1.1.1.1",
      title: replyText,
      describe: replyText,
      userId:commentRep.userId,
      parentId: commentRep.parentId || ""
    });
   
     
    
    console.log("کامنت ثبت شد", addCommentReply.data);
    toast.success("پاسخ ثبت ش")
    setReplyText('');
    setTimeout(()=>{window.location.reload()},1500)
  } catch(error) {
    console.log("خطا در کامنت رخ داده", error);
    toast.error("خطا در ثبت پاسخ")
  } finally {
    setShowReplyForm(false);
  }
}

  

     const CommentlikeHandler = async (Ckid)=>{
  try {
    const commentAddLike = await apiClient.post(
      `https://sepehracademy.liara.run/News/CommentLike/${Ckid}?LikeType=true`
    );
    toast.success("لایک ثبت شد");
    setTimeout(() => { window.location.reload(); }, 1500);
  } catch (error) {
    console.error('خطا', error);
    toast.error("شما قبلا لایک کردید");
  }

  
}

 const CommentDeletelikeHandler = async (Cdkid)=>{
  try {
    const commentAddLike = await apiClient.post(
      `https://sepehracademy.liara.run/News/DeleteCommentLikeNews`,{
         deleteEntityId: Cdkid,
      } 
    );
    toast.success("لایک حذف شد");
    setTimeout(() => { window.location.reload(); }, 1500);

  } catch (error) {
    console.error('خطا', error);
    toast.error("خطا درحذف لایک(api دیسلایک نداشتیم)");
  }
}


 
  return (

  <div className=" flex  flex-col  place-items-center">

    <div className=" w-[80%]  md:w-[80%] pb-50 lg:w-[85%] mb-10 mt-10 xl:w-[85%] flex flex-col justify-between  md:flex-row md:flex-wrap gap-[25px]">
       
      
  <div className="HandleSpecs&NewsDetail w-full flex flex-col lg:flex-row gap-[15px]">
    
    <aside className="w-full z-10 lg:w-[34%] order-2 lg:order-1">
       <div className="handleproductDetail whitespace-nowrap bg-white  shadow-md  rounded-[20px]  h-[400px]
      rounded-[20px] py-[10px] font-medium text-xs px-[10px] pb-[15px] flex flex-row flex-wrap">

      <div className="w-[90%] font-medium h-[20px] text-[#9B0EE1] text-xs px-[10px] pb-[15px] h-[30px] border-b border-[#eee] m-[10px]"> 
			مشخصات خبر
		   </div>	

       <div className="w-[95%] h-[40px] flex justify-between place-items-center "><span className="flex items-center gap-1"> <img src={Eye}/>تعداد بازدید کنندگان</span> <span className="text-xs text-center border border-gray-400 rounded-full p-2 bg-gray-200">{selectedNews?.currentView}</span></div>
       <div className="w-[95%] h-[40px] flex justify-between place-items-center "><span className="flex items-center gap-1"> <img src={Category}/>دسته بندی</span> <span className="border border-gray-400 text-[#9B0EE1] rounded-[17px] p-1 pr-2 pl-2 bg-gray-200 ">{selectedNews?.newsCatregoryName}</span></div>
       <div className="w-[95%] h-[40px] text-[10px] lg:text-[12px]  flex justify-between place-items-center gap-1 "><span className="flex items-center"> <img src={Calender}/>تاریخ انتشار خبر</span> <div><span>{selectedNews ?selectedNews.insertDate?.slice(0,10):"???"}</span></div></div>
        
        <button className="w-[95%] h-[45px] text-xl rounded-[12px] border text-[#9B0EE1] hover:bg-[gray]/20 flex items-center justify-center mt-1 gap-1"><img src={Link}/>کپی کردن لینک صفحه</button>

        <div className="w-[95%] h-[40px] flex justify-between mt-3 place-items-center border-b border-t border-[#eee]  "><span className="text-[gray]">مشخصات نویسنده<img/></span></div>
        <div className="flex flex-row  place-items-center  w-[95%] h-[60px]">
          <img src={selectedNews && selectedNews.addUserProfileImage || "/t2.png"} className="flex rounded-[50%] border  w-[18%] h-[98%]"/>
          <div className="flex flex-col justify-between  w-[61%] h-full">
          <p className=" h-[40%] flex items-center text-[17px] mr-1 gap-1 "><img className="w-[22px] h-[18px] mt-1 pl-1" src={Pen}/>{selectedNews ? selectedNews.addUserFullName: "?"}</p>
          <p className=" h-[40%] text-[gray] mr-1">توضیحات نویسنده</p>
          </div>
          <span className="flex items-center gap-1 w-[20%] mt-7"><img src={NewsIco}/>12 خبر</span>
          
          </div>

        </div>
       
    </aside>

    <div className="w-full lg:w-[65%]  lg:flex-1 flex flex-col gap-6">
      
  
      <div className="order-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
         {selectedNews ? selectedNews.title : "دوره تخصصی ریکت جی اس"} 
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
         {selectedNews ? selectedNews.miniDescribe : " حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید"}
        </p>
      </div>

      <div className=" flex flow-row flex-wrap order-3 lg:order-2">
      
          <div className="relative h-[80%] w-full">
            <img 
              src={selectedNews && selectedNews.currentImageAddress || "/Img.png"}
              onError={(e) => (e.currentTarget.src = "/Img.png")}
              className="h-full w-full  rounded-[25px]"
            ></img>
            <button onClick={favHandlerNews} className={` flex items-center justify-center hover:bg-[red] ${favStatus === true ? 'bg-[red]' : '' } absolute lg:top-10 lg:right-10 right-5 top-5 lg:w-12 lg:h-12 h-6 w-6   backdrop-blur-sm rounded-full`}>
              <img  src={Favorite}/>
            </button>

          </div>
          
          <div className=" w-full flex h-[10%] mt-2 items-center gap-4 text-sm flex-wrap justify-between">

               <div className="flex items-center gap-2">
               <span className="text-sm text-gray-700">میتونی به دوره ما امتیاز بدی</span>
      
             <div className="flex gap-1">
               {[5,4,3,2,1].map((star) => (
                 <button
                   key={star}
                   onClick={() => handleRating(star)}
                   className=" hover:scale-110 cursor-pointer"
                 >
                   <img className="w-[20px] h-[20px]" src={ star <=(rating) ? Star : emptyStar}/>
                 </button>
               ))}
             </div>
             </div>
  
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span>از دوره راضی بودی؟</span>
                  
                  
                  <button onClick={()=>{likeHandler()}} className="flex items-center gap-1 hover:text-green-600 transition">
                    <span className="text-lg"><img src={Like}/></span>
                    <span className="font-medium">{selectedNews ? selectedNews.currentLikeCount : 0}</span>
                  </button>
                  
                  
                  <button onClick={()=> dissLikeHandler()} className="flex items-center gap-1 hover:text-red-600 transition">
                    <span className="text-lg"><img src={Dislike}/></span>
                    <span className="font-medium">{selectedNews ? selectedNews.currentDissLikeCount : 0}</span>
                  </button>
                </div>
                
          </div>
  

      </div>

    </div>
  

  </div>

   <div  className="NewsInfo&relatedNews w-full flex flex-col lg:flex-row gap-[15px]">
        <div className="NewsInfo  shadow-md bg-white rounded-[25px] p-4 flex flex-col justify-between  w-[full] lg:w-[65%]">

           <div className="moreInfo  pb-4">
             <h1 className="text-2xl font-bold text-gray-800 mb-4">
              دوره تخصصی ریکت جی اس
              </h1>
             <p className={` relative text-md text-gray-600 pb-5 leading-relaxed ${showMore ? "":"overflow-hidden h-[300px]"}`}>
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را
               جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید
               
             </p>
             <div className="w-full h-[50px] text-blue-400 text-[12px]
                 flex place-items-center justify-end sticky bottom-[-21px] cursor-pointer
                 backdrop-blur-sm bg-gray/10 "
                 onClick={()=>setShowMore(!showMore)}
               > {showMore ? "مشاهده کمتر >":"مشاهده بیشتر >"}
               </div>
             
              
             

           </div>

           <div className={` shadow-lg bg-white flex flex-col p-2 place-items-center rounded-[25px]`}>
            <div className="flex mb-2  justify-between w-full h-[30px]">
              <span>نظرات</span>
              <button onClick={()=>setAddCommentForm(true)} className="bg-[skyblue] relative flex items-center rounded-[7px] pr-5 pl-5">➕نظر شما</button>
              {addcommentForm && (
                   <div className="mt-4 p-4 z-200 lg:w-[55%] w-[80%] absolute right-[8%]  flex flex-col items-end bg-gray-50 rounded-xl">
                     <button
                        className=" flex items-center gap-1 w-[50px] mb-2 px-2 text-red-300 text-[12px] border  hover:bg-gray-200 rounded-[5px] transition"
                         onClick={() => {
                           setAddCommentForm(false);
                           setReplyText('');
                         }}
                        
                       >
                        <img src={Out} className="w-[20%] h-[80%]"/>
                         بستن
                       </button>
                     <input
                     type="text"
                       value={replyText}
                       onChange={(e) => setReplyText(e.target.value)}
                       placeholder="پاسخ خود را بنویسید..."
                       className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       rows="3"
                     />
                     <div className="flex justify-end gap-2 mt-3">
                      
                       <button
                        className=" flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                         onClick={addCommentHandler}
                        
                       >
                        <img src={Send} className="w-[35%] h-[80%]"/>
                          ارسال 
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             <div className={`flex relative flex-row flex-wrap  place-items-center w-full ${showMore2 ? "":"overflow-hidden h-[470px]"}`}>


                  {Comment.map((comment) => (
                 <div key={comment.id} className="bg-white w-full rounded-2xl shadow-lg p-6 mb-4">
                     
                     
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                           <img className="rounded-full h-full w-full" src={CommentImg}/>
                         </div>
                         <div className="w-full lg:w-[700px] flex flex-row justify-between">
                           <h3 className="font-bold text-gray-800">{comment.userId}</h3>
                           <p className="text-sm whitespace-nowrap text-gray-500">{comment?.insertDate?.slice(0,10)}</p>
                         </div>
                       </div>
                     </div>
         
                     
                     <p className="text-gray-700 leading-relaxed mb-4 pr-2">
                       {comment.title}
                     </p>
         
                    
                     <div className="flex items-center">
                       
                      
                       <div className="flex flex-row pl-2 gap-4">
                         <button 
                         className={`flex items-center rounded-lg transition ${
                             userVote === 'like' 
                               ? 'bg-green-100 text-green-600' 
                               : 'hover:bg-gray-100 text-gray-600'
                           }`}
                           onClick={() => CommentlikeHandler(comment.id)}
                           
                         >
                           <span className="text-xl"><img src={Like}/></span>
                           <span className="font-medium">{comment.likeCount}</span>
                         </button>
         
                         <button 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                             userVote === 'dislike' 
                               ? 'bg-red-100 text-red-600' 
                               : 'hover:bg-gray-100 text-gray-600'
                           }`}
                           onClick={() => CommentDeletelikeHandler(comment.id)}
                         >
                           <span className="text-xl"><img src={Dislike}/></span>
                           <span className="font-medium">{comment.dissLikeCount}</span>
                         </button>
                       </div>
         
                       
                       <button 
                       className="flex items-center gap-2 px-4 py-1 bg-blue-500  hover:bg-blue-600 text-white rounded-[25px] transition"
                         onClick={() => toggleReplyForm(comment.id)}
                         
                       >
                        
                         <span>جواب دادن</span>
                       </button>
         
                     </div>
         
                    
                     {showReplyForm[comment.id] && (
                       <div className="mt-4 p-4 flex flex-col items-end bg-gray-50 rounded-xl">
                         <button
                            className=" flex items-center gap-1 w-[50px] mb-2 px-2 text-red-300 text-[12px] border  hover:bg-gray-200 rounded-[5px] transition"
                             onClick={() => {
                               setShowReplyForm(false);
                               setReplyText('');
                             }}
                            
                           >
                            <img src={Out} className="w-[20%] h-[80%]"/>
                             بستن
                           </button>
                         <textarea
                           value={replyText}
                           onChange={(e) => setReplyText(e.target.value)}
                           placeholder="پاسخ خود را بنویسید..."
                           className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           rows="3"
                         />
                         <div className="flex justify-end gap-2 mt-3">
                          
                           <button
                            className=" flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                             onClick={() =>addCommentReplyHandler(comment.id)}
                            
                           >
                            <img src={Send} className="w-[35%] h-[80%]"/>
                              ارسال 
                           </button>
                         </div>
                       </div>
                     )}
         
                     
                     {Reply && Reply.length > 0 && (
                       <div className=" flex flex-row flex-wrap items-center ">
                        <div className="border-b order-1 border-gray-100 w-155"></div>
                         <button
                         className=" text-gray-500 order-2 hover:text-blue-700 text-[10px]  flex items-center gap-2"
                           onClick={() => toggleReplies(comment.id)}
                           
                         >
                          <span>{showReplies[comment.id] ? '▼' : '◀'}</span>
                           <span>({Reply.filter(r => r.parentId === comment.id).length})
                            مشاهده جواب ها</span>
                         </button>
                         
         
                         
                         {showReplies[comment.id] && (
                           <div className="mt-4 w-full pr-8 order-3 space-y-4">
                             {Reply.map((reply) => (
                              reply.parentId === comment.id && (
                               <div key={reply.id} className="bg-gray-50 rounded-[25px] p-4 border border-[gray]/50 m-2 ">
                                 <div className="flex items-center gap-3 mb-3">
                                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                                     <img className="w-full h-full rounded-full" src={CommentImg}/>
                                   </div>
                                   <div className="flex flex-row justify-between w-full">
                                     <h4 className="font-medium text-gray-800">{reply.author}</h4>
                                     <p className="text-xs text-gray-500 font-medium">{reply?.insertDate?.slice(0,10)}</p>
                                   </div>
                                 </div>
                                 <p className="text-gray-700 text-sm pr-2">{reply.title}</p>
                               </div>
                             )))}
                           </div>
                         )}
                       </div>
                     )}
         
                   </div>
                 ))}
             
               <div className="w-full h-[20px] text-blue-400 text-[12px]
                 flex place-items-center justify-end absolute bottom-0 cursor-pointer bg-[white] "
                 onClick={()=>setShowMore2(!showMore2)}
               > {showMore2 ? "مشاهده کمتر >":"مشاهده بیشتر >"}
               </div>
               </div>
              
           </div>

        </div>

        <div className={`relatedNews bg-white shadow-md  rounded-[20px]  w-[full] lg:w-[35%] ${moreCourse ? "":"overflow-hidden h-[560px]"} 
         rounded-[20px] py-[5px] font-medium text-xs px-[5px] pb-[15px] flex flex-col`}>
     
           <div className="w-full font-medium h-[20px] flex justify-between text-xs px-[10px] pb-[15px] h-[30px] border-b border-[#eee] mt-2 mb-3 ">
            <span className=" text-[gray]"> 
		      	دوره های مرتبط
		         </span>	
      
             <button onClick={()=>setMoreCourse(!moreCourse)} className=" font-medium text-[#9B0EE1]"> 
		      	{moreCourse ? "دوره های کمتر >": "دوره های بیشتر >"}
		         </button>	
      
             </div>

            <div id="grid" className="view3">
               {relatedNews.map((relate)=>(
                <NewsCard
                   key={relate.id}
                   price={relate.cost}
                   id={relate.id}
                   name={relate.title}
                   like={relate.likeCount}
                   category={relate.levelName}
                   teacher={relate.addUserFullName}
                   Img={relate.currentImageAddress || "/cover5.png"}
                   view={relate.currentView}
                   date={relate.startTime}
                  //  newsCatregoryName={relate.newsCatregoryName}
                  

                />
               ))}
              
             
            </div>

        </div>

        </div>

       </div>
       </div>
     )
}
export default newsDetail;