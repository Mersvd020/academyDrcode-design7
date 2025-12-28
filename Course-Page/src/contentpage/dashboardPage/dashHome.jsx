import Dashboard from "./dashPart/dashboard"
import DashCourse from "./dashPart/dashCourse"
import Logo from "../../assets/dashPic/logo.png"
import logo from "../../assets/landPagePic/logo.png"
import Dash from "../../assets/dashPic/dash.png"
import Prof from "../../assets/dashPic/prof.png"
import Course from "../../assets/dashPic/course.png"
import Reserve from "../../assets/dashPic/reserve.png"
import Fav from "../../assets/dashPic/fav.png"
import News from "../../assets/dashPic/news.png"
import Wallet from "../../assets/dashPic/wallet.png"
import Settings from "../../assets/dashPic/setting.png"
import Left from "../../assets/dashPic/left.png"
import Home from "../../assets/navIco/home.png"
import Home2 from "../../assets/navIco/Home2.png"
import Menu from "../../assets/navIco/menu.png"
import Moon from "../../assets/navIco/Moon.png"
import Avatar from "../../assets/navIco/avatar.png"

import {Link,Outlet,useNavigate,useLocation,useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import apiClient from "../../hook/interceptor"
import toast from "react-hot-toast";


import {useSelector,useDispatch} from "react-redux"
import {logout} from "../../store/authSlice"

const dashHome = ()=>{
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const handlelogOut=()=>{
      try{
      dispatch(logout())
      navigate("/");
      }finally{
         // setTimeout(()=>{window.location.reload()},1000)
         toast("از حساب خارج شدید😒")
      }

   }

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

      const {id} = useParams();

   const getPageTitle = (pathname) => {
    switch(pathname) {
      case "/dashboard/dash": return `سلام ${user.fName} خوش آمدی :)`;
      case "/dashboard/profile": return "پروفایل" ;
      case "/dashboard/dashcourse": return "دوره های من";
      case "/dashboard/MyReserve": return "رزرو های من";
      case "/dashboard/FavCourse": return "دوره های مورد علاقه";
      case "/dashboard/FavNews": return "اخبار های مورد علاقه";
      default: return `سلام ${user.fName} خوش آمدی :)`;
    }
  };

   const location = useLocation();
const pageTitle = getPageTitle(location.pathname);

  //prof pic
 const userPic = user?.currentPictureAddress

    return(
         <div dir="ltr"  className=" relative lg:h-screen  bg-[#F5F5F5] lg:bg-[#313131] w-full lg:overflow-hidden flex lg:flex-row lg:items-center flex-col ">
           
          <div dir="rtl" className="bg-[#F5F5F5] w-[90%] lg:h-[95%] flex flex-col gap-3 items-center ml-5 rounded-[25px] ">
            <div className="w-[98%] lg:h-[12%] lg:flex hidden justify-between">
               <div className="w-[300px] h-full text-[black]/80 text-center flex items-center text-xl font-bold">{pageTitle}</div>

               <div className="w-[330px] h-full  flex flex-row items-center justify-between">

                <div className="w-[40%] h-[80%] flex gap-5 items-center">
                   <button onClick={()=>navigate("/")} className="rounded-full  w-[45px] h-[55%] bg-[white] "><img src={Home2} className="w-1/2 h-1/2 m-auto"/></button>
                   <button className="rounded-full  w-[45px] h-[55%] bg-[white] "><img src={Moon} className="w-1/2 h-1/2 m-auto"/></button>
                   </div>
                  <div className="h-[80%] w-[60%] flex items-center ">
                      <div className="rounded-full  w-[30%] h-[80%] bg-[white] "><img src={userPic} className="w-full h-full rounded-full"/></div>
                      <div className="h-full w-[70%]">
                        <h3 className="w-full h-[40%] mt-2 whitespace-nowrap font-bold">{user.fName + " " + user.lName }</h3>
                        <h3 className="w-full h-[40%] whitespace-nowrap font-medium text-[black]/70">دانشجو</h3>
                      </div>
                  </div>
               </div>

            </div>
            
             <div className=" relative lg:hidden  w-full flex items-center justify-between lg:flex-row flex-row-reverse mt-5 mb-10 z-50 rounded ">
                
              <img src={Moon} className=" w-[50px] h-[50px] scale-50 rounded-full cursor-pointer" />

               <div className="w-32">
                 <img src={logo} alt="Logo" className="w-full h-auto" />
               </div>
                 
            <Link to="/dashboard/profile" className=" w-[50px] h-[50px] rounded-full cursor-pointer"><img src={Avatar} className="w-full h-full" /></Link>      
              </div>


          <div className="
           w-[98%] lg:h-[85%]  lg:mb-0 mb-20 flex flex-col items-center rounded-[25px]">
            <Outlet/>
           
          </div>

          </div>

          
         <div dir="rtl" className="w-[18%]  font-low text-[14px] h-[95%] lg:flex hidden flex-col items-center gap-10 ">

             <img src={Logo} className="w-[60%] ml-20 h-[7%]"/>         
           
          <ul   className="text-white m-0 p-0  w-full h-[60%]  ">
              <Link to="/dashboard/dash"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Dash} className=" mr-7 ml-5  "/> داشبورد</li></Link>
              <Link to="/dashboard/profile"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Prof} className=" mr-7 ml-5 "/> پروفایل</li></Link>
              <Link to="/dashboard/dashcourse"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Course} className=" mr-7 ml-5 "/> دوره های من</li></Link>
              <Link to="/dashboard/MyReserve"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Reserve} className=" mr-7 ml-5 "/> رزرو های من</li></Link>
              <Link to="/dashboard/FavCourse"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Fav} className=" mr-7 ml-5 "/> دوره های مورد علاقه</li></Link>
              <Link to="/dashboard/FavNews"><li className={`w-full h-[14%] hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={News} className=" mr-7 ml-5 "/> اخبار مورد علاقه</li></Link>
              <li className={`w-full h-[14%] cursor-pointer hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center `}> <img src={Wallet} className=" mr-7 ml-5 "/> پرداخت ها</li>
           </ul>

           <ul  className="text-white m-0 p-0   w-full  h-[20%] ">
               <li className="w-full h-[50%] cursor-pointer hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center "> <img src={Settings} className=" mr-7 ml-5 "/> تنظیمات امنیتی</li>
              <li onClick={()=>{handlelogOut() ;}} className=" w-full h-[50%] cursor-pointer hover:border-r-[3px] hover:font-medium hover:text-[18px] rounded-[3px] transition flex items-center "> <img src={Left} className=" mr-7 ml-5 "/> خروج از حساب</li>
              
           </ul>

           
           </div>


            <div className="w-full z-500 text-[white] h-[60px] rounded-t-[10px] bg-[#313131] fixed lg:hidden bottom-0 ">

                   <ul dir="ltr" className=" flex justify-evenly gap-10 h-full w-full items-center font-medium">

                     <Link to="/"><li className=" border-[white] hover:border-b-2 p-1">
                       <img src={Home} /> 
                     </li></Link>
                     <Link to="/dashboard/dashcourse"><li className="border-[white] hover:border-b-2 p-1">
                        <img src={Reserve}/>
                     </li></Link>
                     <Link to="/dashboard/profile"><li className="border-[white] hover:border-b-2 p-1">
                        <img src={Course}/>
                     </li></Link>
                     <Link to="/dashboard/dash"><li className="border-[white] hover:border-b-2 p-1">
                       <img src={Dash} />
                     </li></Link>
                     <label  className="relative  border-[white] hover:border-b-2 p-1">
                       <img src={Menu} /><input  type="checkbox" className="peer hidden"/>
                       
                        <ul dir="rtl" className="bg-[white] text-[black] text-[12px] m-0 p-0 h-[190px] w-[180px] rounded-[12px]  
                        hidden peer-checked:flex flex-col items-center absolute bottom-[60px] right-[1px]">

                    <Link to="/dashboard/MyReserve"  className={`w-full h-[19%]  rounded-[3px] transition flex items-center `} ><img src={Reserve} className="ml-2 mr-4" /> رزرو های من</Link>
                 <Link to="/dashboard/FavCourse"className={`w-full h-[19%]  rounded-[3px] transition flex items-center `}> <img src={Fav}  className="ml-2 mr-3" /> دوره های مورد علاقه</Link>
                <Link to="/dashboard/FavNews"className={`w-full h-[19%]  rounded-[3px] transition flex items-center `}> <img src={News}  className="ml-2 mr-3" /> اخبار مورد علاقه</Link>           
               <li className="w-full h-[19%] cursor-pointer  rounded-[3px] transition flex items-center "> <img src={Settings}  className="ml-2 mr-3" /> تنظیمات امنیتی</li>
                <li onClick={handlelogOut} className=" w-full h-[19%] cursor-pointer  rounded-[3px] transition flex items-center text-[red] "> <img src={Left}  className="ml-2 mr-3"  /> خروج از حساب</li>
                        </ul>
                     </label>
                   </ul>
               </div>

          </div>
        
    )
}
export default dashHome