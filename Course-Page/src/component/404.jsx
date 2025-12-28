import {useNavigate} from "react-router-dom"
import Sad from "../assets/404/Sad.png"
import Img404 from "../assets/404/44.png"
import rec1 from "../assets/404/rec1.png"
import rec2 from "../assets/404/rec2.png"
import rec3 from "../assets/404/rec3.png"
import rec4 from "../assets/404/rec4.png"
import rec5 from "../assets/404/rec5.png"
import rec6 from "../assets/404/rec6.png"
import rec7 from "../assets/404/rec7.png"
import rec8 from "../assets/404/rec8.png"
import square4 from "../assets/404/squre4.png"
import square6 from "../assets/404/squre6.png"

const page404 = ()=>{

    const navigate = useNavigate();

  const HomeHandler = ()=>{
      navigate("/");
  }

   return(
     <div className="relative flex font-medium flex-col items-center m-auto h-screen w-full">
        <img className="absolute left-0 top-0" src={square6}/>
        <img className="absolute right-0 bottom-0" src={square4}/>
        <img className="absolute lg:top-20 top-30 w-[90%] lg:w-[50%] " src={Img404}/>
         <img className="absolute right-70 bottom-20" src={rec1}/>
         <img className="absolute left-70 bottom-10" src={rec2}/>
         <img className="absolute left-70 bottom-11" src={rec3}/>
         <img className="absolute lg:left-70 left-5 top-70 lg:top-50" src={rec4}/>
         <img className="absolute lg:left-150 left-25 top-15" src={rec5}/>
         <img className="absolute lg:right-70 right-10 top-5" src={rec6}/>
         <img className="absolute lg:right-60 right-10 bottom-100 lg:bottom-90" src={rec7}/>
         <img className="absolute lg:right-70 right-20 bottom-80 lg:bottom-70" src={rec8}/>
        <div className="w-full h-[60%] lg:h-[80%] z-10 lg:w-[27%] m-auto flex flex-col items-center">
            <img src={Sad} className="lg:w-[80%] w-[50%] h-[200px] lg:h-[300px]"/>
            <h3 className="text-center "><br/>صفحه‌ای که به دنبال آن هستید، گم شده یا دیگر وجود ندارد!!!
می‌توانید به صفحه اصلی ما برگردید</h3>
            
            <button className=" lg:w-[80%] w-[70%] mt-5 rounded-[5px] h-[50px] bg-[#9B0EE1] text-white text-xl" type="submit" onClick={()=>HomeHandler()}>برگشت به صفحه اصلی</button>

        </div>

     </div>
   )
}
export default page404;