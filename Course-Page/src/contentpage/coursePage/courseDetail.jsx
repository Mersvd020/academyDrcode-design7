import { useParams , useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import PicIco from "../../assets/icon/Education.png"
import Like from "../../assets/icon/like.png"
import Dislike from "../../assets/icon/dislike.png"
import emptyStar from "../../assets/icon/emptyStar.png"
import Star from "../../assets/icon/Star.png"
import CommentImg from "../../assets/icon/comment.png"
import HandleSpecs from "../../component/handleSpecs.jsx"
import Img from "../../assets/cardImg/Img3.png"
import ProductList from "../../component/course/productList.jsx"
import ProductCard from "../../component/course/productCard.jsx"
import Out from "../../assets/icon/out.png"
import Send from "../../assets/icon/send.png"
import "../../assets/style/tailwinds/tailwindSt(productCard).css"
import Favorite from "../../assets/icon/favorite.png"
import apiClient from "../../hook/interceptor.js"

import { toast } from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"; //MUI

import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"

import { fetchCourseDetail,
   fetchCourseList,
   fetchCourseComment,
   fetchReplyComment,
   setCourseFav,
   setCourseRate,
   setLikeCourse,
   setDisLikeCourse,
   setCommentCourse,
   setCommentReplyCourse,
   LikeComment,
   DisLikeComment,
   deleteLikeCourse,
   deleteDisLikeCourse,
   deleteFavCourse,
   deleteLikeComment,
  } from "../../API/course.js"


const courseDetail = () => {
  
  const {id} = useParams();
  const [relatedCourse, setRelatedCourse] = useState([]);
  const queryClient = useQueryClient();
  

  //courseList
   const {data:Product = []} = useQuery({
     queryKey : ['relatedCourse'],
     queryFn: fetchCourseList
     
   })

  //selectedCourse

   const {data:selectedCourse = []}= useQuery({
    queryKey : ['selectedCourse',id],
    queryFn : fetchCourseDetail,
    
  })
  

  //relatedProduct
  useEffect(() => {
    if (Product && Product.length > 0 && selectedCourse && selectedCourse.describe) {
        const related = Product.filter((el) => 
            el.describe === selectedCourse.describe
        ).slice(0, 5);
        setRelatedCourse(related);
    }
    // console.log("selectedCourse",selectedCourse)
}, [Product, selectedCourse]); 

 
//// CourseCommentList

  const {data:Comment = []} = useQuery({
     queryKey:['fetchComment',id],
     queryFn:fetchCourseComment
  })
  // console.log("comment",Comment)
////CourseCommentReplyList 

  const [replyId,setReplyId] = useState([]);

  const {data:Reply = []} = useQuery({
    queryKey:["fetchReply",Comment,id],
    queryFn:fetchReplyComment
  })
   

   

//////////////////////////////////////////////
//rate

const [rating, setRating] = useState(0);

useEffect(()=>{
  setRating(selectedCourse?.courseRate)
},[selectedCourse])

// reply Toggle
 const [showReplies, setShowReplies] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});

  const toggleReplyForm = (commentId) => {
  setShowReplyForm(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
  // console.log(commentId)
};

  const toggleReplies = (commentId) => {
  setShowReplies(prev => ({
    ...prev,
    [commentId]: !prev[commentId]
  }));
  // console.log(commentId)
};

  const [replyText, setReplyText] = useState('');
  const[addcommentForm,setAddCommentForm] = useState(false);
  const [userVote, setUserVote] = useState(null);
   
///////////// {Mutation}///////////////////

///FAV

 const FavMutation = useMutation({
     mutationFn:setCourseFav,
     onSuccess:()=>{
        toast.success("دوره به لیست مورد علاقه شما اضافه شد")
        queryClient.invalidateQueries(['selectedCourse',id]);
     },
     onError:(error)=>{
       toast.error('خطا در ثبت دوره به لیست مورد علاقه')
       console.log("setFav Error:",error);
     }
 })
 
//RATE
 const ratingMutation = useMutation({
    mutationFn:setCourseRate,
    onSuccess:()=>{
       toast.success("امتیاز ثبت شد")
      queryClient.invalidateQueries(['selectedCourse', id]);// رفرش دوره مورد نظر
    },
    onError:(error)=>{
       console.log("rate Error:",error);
       toast.error("خطا در ثبت نظر")

    }
 })

 //LIKE
 const likingMutation = useMutation({
    mutationFn:setLikeCourse,
    onSuccess:()=>{
      toast.success('لایک با موفقیت ثبت شد');
      queryClient.invalidateQueries(['selectedCourse',id]);
    },
    onError:(error)=>{
    console.error('setlike Error', error);
    toast.error("خطا");
    }

 })

 //DISLIKE
 const dislikingMutation = useMutation({
    mutationFn:setDisLikeCourse,
    onSuccess:()=>{
      toast.success('دیسلایک با موفقیت ثبت شد');
      queryClient.invalidateQueries(['selectedCourse',id]);
    },
    onError:(error)=>{
    console.error('setDislike Error', error);
    toast.error("خطا در دیسلایک");
    }
 })

 // COMMENT 
   
  const commentMutation = useMutation({
     mutationFn:setCommentCourse,
     onSuccess:()=>{
       toast.success("نظر شما بعد تایید ادمین قابل نمایش")
       queryClient.invalidateQueries(['fetchComment',id])
       setAddCommentForm(false);
     },
     onError:(error)=>{
       toast.error("خطا در نظر گذاشتن");
       console.log("add comment Error",error)
     }
  })

  //REPLY COMMENT

  const replyCommentMutation = useMutation({
     mutationFn:setCommentReplyCourse,
      onSuccess:()=>{
       toast.success("پاسخ شما ثبت شد")
       queryClient.invalidateQueries(['fetchComment',id])
       setShowReplyForm(false);
       setReplyText('');
     },
     onError:(error)=>{
       toast.error("خطا در گذاشتن پاسخ");
       console.log("add reply Error",error)
     }

  })

  ///COMMENT LIKE
  const likeCommentMutation = useMutation({
     mutationFn:LikeComment,
     onSuccess:()=>{
      toast.success('لایک با موفقیت ثبت شد');
      queryClient.invalidateQueries(['fetchComment',id]);
    },
    onError:(error)=>{
    console.error('setlike Error', error);
    toast.error("خطا");
    }

  })

  ///COMMENT DISLIKE
   const dislikeCommentMutation = useMutation({
     mutationFn:DisLikeComment,
     onSuccess:()=>{
      toast.success('دیسلایک با موفقیت ثبت شد');
      queryClient.invalidateQueries(['fetchComment',id]);
    },
    onError:(error)=>{
    console.error('setlike Error', error);
    toast.error("خطا");
    }

  })

   ///COMMENT DELETE LIKE
  const deletelikeCommentMutation = useMutation({
     mutationFn:deleteLikeComment,
     onSuccess:()=>{
      toast.success('لایک با موفقیت حذف شد');
      queryClient.invalidateQueries(['fetchComment',id]);
    },
    onError:(error)=>{
    console.error('deletelike Error', error);
    toast.error("خطا");
    }

  })



 //DELETE FAV

 const deletingFavMutation = useMutation({
      mutationFn:deleteFavCourse,
      onSuccess:()=>{
     toast.success("دوره از لیست مورد علاقه شما حذف شد");
     queryClient.invalidateQueries(['selectedCourse',id]); 
   },
   onError:(error)=>{
     console.log("deleteFav Error:",error)
     toast.error("خطا در حذف دوره مورد علاقه از لیست")
    //  console.log("userLikeId",selectedCourse?.userLikeId)
   }
      
 })

 //DELETE LIKE
 const deletinglikeMutation = useMutation({
   mutationFn:deleteLikeCourse,
   onSuccess:()=>{
     toast.success("لایک با موفقیت حذف شد");
     queryClient.invalidateQueries(['selectedCourse',id]); 
   },
   onError:(error)=>{
     console.log("deleteLike Error:",error)
     toast.error("خطا در حذف لایک")
    //  console.log("userLikeId",selectedCourse?.userLikeId)
   }
 })

 //DELETE DISLIKE
  const deletingdislikeMutation = useMutation({
   mutationFn:deleteDisLikeCourse,
   onSuccess:()=>{
     toast.success("دیسلایک با موفقیت حذف شد");
     queryClient.invalidateQueries(['selectedCourse',id]); 
   },
   onError:(error)=>{
     console.log("deleteLike Error:",error)
     toast.error("خطا در حذف دیسلایک")
    //  console.log("userLikeId",selectedCourse?.userLikeId)
   }
 })


///////////{Handler}///////////////

const FavHandler = async ()=>{
    if(selectedCourse?.isUserFavorite){
       deletingFavMutation.mutate({
        userFavoriteId:selectedCourse?.userFavoriteId
       })
    }
    else{
       FavMutation.mutate({
         courseId : id
       })
    }
}

 const setRateHandler = async(rate) =>{
    if(selectedCourse?.currentUserSetRate){
       toast.error("شما قبلا امتیاز دادید");
       return
    }
    ratingMutation.mutate({
       courseId: id,
       rate: rate
    });
 }

 const commentHandler = async()=>{
    
  commentMutation.mutate({
     courseId: id,
     replyText:replyText

  })
 }
 
 const replyCommentHandler = async(commentid)=>{
    //  console.log("commentId",commentid)
     replyCommentMutation.mutate({
       CommentId: commentid,
       courseId: id,
       replyText:replyText
     }) 
 }

 const commentLikeHandler = async(commentId,userIsLikeComment)=>{
  
      if(userIsLikeComment)
        {
          deletelikeCommentMutation.mutate({
            commentId:commentId
          })
          console.log("Delete")
      }

      else{
        likeCommentMutation.mutate({
           commentId:commentId
        })
        console.log("like")
      }
 }

 const commentDisLikeHandler = async(commentId)=>{
     if(Comment?.currentUserIsDissLike){
        return
     }
     else{
      dislikeCommentMutation.mutate({
        commentId:commentId
      })

     }
 }

 const LikeHandler = async()=>{
    
     if(selectedCourse?.userIsLiked){
        deletinglikeMutation.mutate({
           userLikeId : selectedCourse?.userLikeId
        })
     }
     else{
     likingMutation.mutate({
        courseId:id
     })
    }
 }

 const DisLikeHandler = async()=>{
    
     if(selectedCourse?.userIsDissLike){
        deletingdislikeMutation.mutate({
           userDissLikeId : selectedCourse?.userDissLikeId
        })
     }
     else{
     dislikingMutation.mutate({
        courseId:id
     })
    }
 }

 
  const[moreCourse,setMoreCourse] = useState(false);

   const[showMore,setShowMore] = useState(false);
  const[showMore2,setShowMore2] = useState(false);  
 
 
  return (

  <div className=" flex flex-col  place-items-center">

    <div className=" w-[80%]  md:w-[80%] pb-50 lg:w-[85%] mb-10 mt-10 xl:w-[85%] flex flex-col justify-between  md:flex-row md:flex-wrap gap-[25px]">
       
      
  <div className="HandleSpecs&productDetail w-full flex flex-col lg:flex-row gap-[15px]">
    
    <aside className="w-full z-10 lg:w-[34%] order-2 lg:order-1">
      {selectedCourse && selectedCourse?.teacherId ?
      <HandleSpecs 
        cost={selectedCourse.cost}
        capicity={selectedCourse.capacity}
        teacher={selectedCourse?.teacherName}
        status={selectedCourse.statusName}
        title={selectedCourse.title}
        startDate={selectedCourse.startTime}
        endDate={selectedCourse.endTime}
        CourseteacherId={selectedCourse?.teacherId}
        studentCount={selectedCourse?.studentCount}
        id={id}
      />
       :
       <HandleSpecs
        cost={"?"}
        />
      }
       
    </aside>

    <div className="w-full lg:w-[65%]  lg:flex-1 flex flex-col gap-6">
      
  
      <div className="order-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
         {selectedCourse ? selectedCourse.describe : "دوره تخصصی ریکت جی اس"} 
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
         {selectedCourse ? selectedCourse.title : " حدود 40 ساعت آموزش جامع و تخصصی این کتابخانه فرانتند و استفاده را جاوا اسکریپت را به صورت کاملا پروژه محور و کاربردی یاد میگیرید"}
        </p>
      </div>

      <div className=" flex flow-row flex-wrap order-3 lg:order-2">
      
          <div className="relative h-[80%] w-full">
            <img 
              src={selectedCourse && selectedCourse.imageAddress || "/Img.png"}
              onError={(e) => (e.currentTarget.src = "/Img.png")}
              className="h-full w-full rounded-[25px]"
            ></img>
            <button onClick={FavHandler} className={`flex justify-center border border-[gray] hover:bg-[red] ${selectedCourse?.isUserFavorite ? 'bg-[red]' : '' } items-center absolute lg:top-10 lg:right-10 right-5 top-5 lg:w-12 lg:h-12 h-6 w-6   backdrop-blur-sm rounded-full`}>
              <img src={Favorite}/>
            </button>

          </div>
          
          <div className=" w-full flex h-[10%] items-center gap-4 text-sm flex-wrap justify-between">

               <div className="flex items-center gap-2">
               <span className="text-sm text-gray-700">میتونی به دوره ما امتیاز بدی</span>
      
             <div className="flex gap-1">
               {[5,4,3,2,1].map((star) => (
                 <button
                   key={star}
                   onClick={() => setRateHandler(star)}
                   className=" hover:scale-110 cursor-pointer"
                 >
                   <img className="w-[20px] h-[20px]" src={ star <=(rating) ? Star : emptyStar}/>
                 </button>
               ))}
             </div>
             </div>
  
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span>از دوره راضی بودی؟</span>
                  
                  
                  <button onClick={()=> LikeHandler()} className="flex items-center gap-1 hover:text-green-600 transition">
                    <span className="text-lg"><img src={Like}/></span>
                    <span className="font-medium">{selectedCourse ? selectedCourse.likeCount : "0"}</span>
                  </button>
                  
                  
                  <button onClick={()=> DisLikeHandler()} className="flex items-center gap-1 hover:text-red-600 transition">
                    <span className="text-lg"><img src={Dislike}/></span>
                    <span className="font-medium">{selectedCourse ? selectedCourse.dissLikeCount : "0"}</span>
                  </button>
                </div>
                
          </div>
  

      </div>

    </div>
  

  </div>

   <div  className="productInfo&relatedProduct w-full flex flex-col lg:flex-row gap-[15px]">
        <div className="productInfo  shadow-md bg-white rounded-[25px] p-4 flex flex-col justify-between  w-[full] lg:w-[65%]">

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



            <div className="addComment flex mb-2  justify-between w-full h-[30px]">
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
                             onClick={commentHandler}
                            
                           >
                            <img src={Send} className="w-[35%] h-[80%]"/>
                              ارسال 
                           </button>
                         </div>
                       </div>
                     )}
            </div>


             <div className={`commentfetch  flex relative flex-row flex-wrap  place-items-center w-full ${showMore2 ? "":"overflow-hidden h-[470px]"}`}>
                  {Comment.map((comment) => (
                 <div key={comment.id} className="bg-white w-full rounded-2xl shadow-lg p-6 mb-4">
                     
                     
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                           <img className="rounded-full h-full w-full" src={CommentImg}/>
                         </div>
                         <div className="w-full lg:w-[700px] flex flex-row justify-between">
                           <h3 className="font-bold text-gray-800">{comment.author}</h3>
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
                           onClick={()=> commentLikeHandler(comment.id,comment?.currentUserIsLike)}
                           
                         >
                           <span className="text-xl"><img src={Like}/></span>
                           <span className="font-medium">{comment?.likeCount}</span>
                         </button>
         
                         <button 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                             userVote === 'dislike' 
                               ? 'bg-red-100 text-red-600' 
                               : 'hover:bg-gray-100 text-gray-600'
                           }`}
                           onClick={()=>  commentDisLikeHandler(comment.id)}
                         >
                           <span className="text-xl"><img src={Dislike}/></span>
                           <span className="font-medium">{comment?.disslikeCount}</span>
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
                             onClick={() => replyCommentHandler(comment.id)}
                            
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
                                     <h4 className="font-medium text-gray-800">{reply?.author}</h4>
                                     <p className="text-xs text-gray-500 font-medium">{reply?.insertDate?.slice(0,10)}</p>
                                   </div>
                                 </div>
                                 <p className="text-gray-700 text-sm pr-2">{reply?.title}</p>
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





        <div className={`relatedProduct bg-white shadow-md  rounded-[20px]  w-[full] lg:w-[35%] ${moreCourse ? "":"overflow-hidden h-[560px]"} 
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
               {relatedCourse.map((relate)=>(
                <ProductCard
                   key={relate.courseId}
                   price={relate.cost}
                   id={relate.courseId}
                   name={relate.title}
                   like={relate.likeCount}
                   category={relate.levelName}
                   teacher={relate.teacherName}
                   Img={relate.imageAddress || relate.tumbImageAddress || "/cover3.png"}
                   date={relate.startTime}

                />
               ))}
              
             
            </div>

        </div>

        </div>

       </div>
       </div>
     )
}
export default courseDetail;