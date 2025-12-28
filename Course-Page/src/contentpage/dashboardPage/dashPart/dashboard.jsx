
  import CommentImg from "../../../assets/icon/comment.png"
  import CourseImg from "../../../assets/icon/CourseImg.png"
  import ReserveImg from "../../../assets/icon/ReserveImg.png"
  import NewsImg from "../../../assets/icon/NewsImg.png"
  import FavImg from "../../../assets/icon/FavImg.png"
  import Precentage from "../../../assets/icon/precentage.png"
  import Pen from '../../../assets/icon/Pen.png'
  import ReactJs from "../../../assets/cardImg/reactJs.png"
  import Show from "../../../assets/icon/show.png"
  import CommentAkhbar from "./profilePart/commentAkhbar"
  import CommentCourse from "./profilePart/commentCourse"
  import CoursesDashHome from "./profilePart/CoursesDashHome"
  import ReserveDashHome from "./profilePart/ReserveDashHome"
  import {useEffect,useState} from "react"
  import apiClient from "../../../hook/interceptor"
import { useNavigate } from "react-router-dom"
import axios from "axios"

  const dashboard = ()=>{

      const[moreComment,setMoreComment] = useState(false);
      const[moreReserve,setMoreReserve] = useState(false);
      const[moreCourse,setMoreCourse] = useState(false);

      const navigate = useNavigate();


     const [report,setReport] = useState();
  useEffect(()=>{
      
    const fetchReport = async ()=>{
      try{
       const fetch = await axios.get("https://sepehracademy.liara.run/Home/LandingReport");
       const data = fetch.data;
       setReport(data);
      }catch(error){
        console.log("error landing report",error)
      }
       
    }
    fetchReport();
  },[])

  const [Product, setProduct] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(
          "https://sepehracademy.liara.run/SharePanel/GetMyCourses?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=LastUpdate&Query=1"
        );
        const data = await response.data;
        setProduct(data);
      } catch (error) {
        console.error("خطا در دریافت داده:", error);
      }
    };

    fetchProduct();
  }, []);

  const[News,setNews] = useState([]);
 
  
      // console.log("News:",News);

      useEffect(()=>{
        const fetchNews = async ()=>{
          try{  
        const response = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetMyFavoriteNews");
        const data = await response.data.myFavoriteNews;
            setNews(data);
            // console.log("data",data);
        
          }catch(error){
           console.error('خطا در دریافت داده:', error);
          }
         }
        
        fetchNews()
      },[]);  


 const[teacherList,setTeacherList] = useState([]);

       useEffect(()=>{
        const teacherll= async()=>{
           try{
        const fechteacher = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetMyCoursesReserve");
         const Data = fechteacher.data;
           setTeacherList(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      teacherll(); 
     },[]);

const [userFav,setUserFav] = useState([]); 

     useEffect(()=>{
        const Userall= async()=>{
           try{
        const fechUser = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetMyFavoriteCourses");
         const Data = fechUser.data.favoriteCourseDto;
           setUserFav(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      Userall(); 
     },[]);

     const [user,setUser] = useState([]); 

     useEffect(()=>{
        const Userall= async()=>{
           try{
        const fechUser = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetProfileInfo");
         const Data = fechUser.data;
           setUser(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      Userall(); 
     },[]);

      const toPersianDigits=(str)=> {
    return str.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  }

      const Course = [
          {id:"1s",number : 0},
          {id:"2d",number : 0},
          {id:"3f",number : 0},
          {id:"4g",number : 0},
          
      ];
   
Course[0].number = Product?.totalCount;
Course[2].number = News?.length;
Course[1].number = teacherList?.length;
Course[3].number = userFav?.length;
     

      return(
        <>              
          <div className=" userStatus rounded-[25px] w-full lg:h-[25%] 
                  flex  flex-row flex-wrap  justify-between items-center whitespace-nowrap font-medium  gap-[15px]">
                        <div className=" shadow-md bg-[white] flex flex-col  items-center rounded-[25px] w-[47%] h-[130px] lg:w-[13%] lg:h-[95%]">
                          <div className=" w-[50%] h-[40%]  flex flex-col items-center"><img className="m-auto" src={CourseImg}/></div>
                          <div className=" w-[50%] h-[35%] text-base/8 flex flex-col text-[purple]  items-center">دوره ها</div>
                          <div className=" w-[50%] h-[30%] flex flex-col items-center">{Course[0].number}</div>
                          </div>
                        <div className=" shadow-md bg-[white] flex flex-col items-center rounded-[25px] w-[47%] h-[130px] lg:w-[13%] lg:h-[95%]">
                          <div className=" w-[50%] h-[40%]  flex flex-col items-center"><img className="m-auto" src={ReserveImg}/></div>
                          <div className=" w-[50%] h-[35%] text-base/8 flex flex-col text-[blue] items-center">رزرو ها</div>
                          <div className=" w-[50%] h-[30%] flex flex-col items-center">{Course[1].number}</div>
                        </div>
                        <div className=" shadow-md bg-[white] flex flex-col items-center rounded-[25px] w-[47%] h-[130px] lg:w-[13%] lg:h-[95%]">
                          <div className=" w-[50%] h-[40%]  flex flex-col items-center "><img className="m-auto" src={NewsImg}/></div>
                          <div className=" w-[50%] h-[35%] text-base/8 flex flex-col items-center text-[#3C8B85]">اخبار</div>
                          <div className=" w-[50%] h-[30%] flex flex-col items-center">{Course[2].number}</div>
                        </div>
                        <div className=" shadow-md bg-[white] flex flex-col items-center rounded-[25px] w-[47%] h-[130px] lg:w-[13%] lg:h-[95%]">
                          <div className=" w-[50%] h-[40%]  flex flex-col items-center"><img className="m-auto" src={FavImg}/></div>
                          <div className=" w-[50%] h-[35%] text-base/8 flex flex-col items-center text-[red]">علاقه مندی ها</div>
                          <div className=" w-[50%] h-[30%] flex flex-col items-center">{Course[3].number}</div>
                        </div>
                        <div className=" bg-[white] shadow-md rounded-[25px] w-full lg:w-[35%] lg:h-[95%] h-[130px]
                        flex flex-col items-center justify-center">
                          
                          <div className=" w-[80%] h-full lg:h-[95%] flex flex-row">
                             <div className="w-[40%]  flex items-center justify-center bg-[url('/Precentage.png')] bg-[length:100%_100%] h-full m-auto">
                               <div className=" w-[55px] flex items-center justify-center text-[25px] text-[#3c8b85] h-[45px]">%{user?.profileCompletionPercentage}</div>
                              {/* <img className="w-[full] h-full m-auto" src={Precentage}/> */}
                              </div>
                              <div className=" w-[60%] h-[90%] m-auto lg:text-base/8 text-center flex flex-col items-center">
                                  <div className=" w-full text-[13px]  h-[30%]">وضیعت حساب کاربری</div>
                                  <div className=" w-full text-[12px] text-gray-600 h-[30%]">%{user?.profileCompletionPercentage}مانده تا تکمیل شه</div>
                                  <button onClick={()=> navigate("/dashboard/profile")} style={{ backgroundImage: `url(${Pen})` }} className="border border-[gray]/50 text-gray-600 
                                  bg-[length:15px_15px] lg:bg-[position:right_25px_center] bg-[position:right_5px_center] bg-no-repeat text-base/1 w-[80%] lg:text-[13px] lg:text-center  text-[10px] h-[30px] mb-2 lg:h-[30%] rounded-[25px]">ویرایش پروفایل</button>
                              </div>

                          </div>
                        </div>
                </div>

                <div className=" boxContent rounded-[25px] w-full h-[75%] mt-4
                  flex lg:flex-row lg:flex-wrap flex-col lg:justify-between">

                      <div className=" rounded-[25px]  mb-5  flex flex-col lg:w-[49.5%] lg:h-[95%]">
                      
                      <ReserveDashHome />
                              
                      <CoursesDashHome />
                                
                        </div>
                        
                      <div className={` bg-[white] flex flex-col items-center rounded-[25px] lg:w-[49%]  shadow-md overflow-hidden h-[500px] lg:mb-0 mb-20 lg:h-[90%]  `}>
                              
                          <div className="w-[95%] font-medium  h-[20px] flex justify-between items-center text-xs px-[10px] pb-[15px] h-[30px] border-b border-[#eee] mt-3 mb-3 ">
                          <span className=" text-[#9B0EE1] text-[14px] font-extrabold">                        نظرات کاربران</span>	
                    
                            <button onClick={()=>setMoreComment(!moreComment)} className=" text-[10px] text-[#1F96E6] "> 
                          {moreComment ? "مشاهده کمتر >": "مشاهده بیشتر >"}
                            </button>	
                    
                                </div>

                                <div className="commentContent w-[95%] h-full">
                                  
                                    <CommentCourse />

                                    <CommentAkhbar />
                                </div>
                    
              
                      </div>

                      
                      
                </div>
                  
            </>
          
      )
  }
  export default dashboard