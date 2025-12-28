import Jet from "../assets/icon/jet.png"
import DarkMode from "../assets/icon/darkMode.png"
import Microfon from "../assets/icon/microfon.png"

import { useSelector,useDispatch } from "react-redux"
import {darkBt} from "../store/darkmode"

const jet = ({setNightMode,nightMode})=> {

 const Scroll = ()=>{
    window.scrollTo({ top:0, behavior:"smooth"});
 }
  
 const dispatch = useDispatch();
 const setNight = ()=>{
   dispatch(darkBt());
 }


return(  
    <>
    <div onClick={()=>Scroll()}  className="fixed top-[340px] md:left-2 lg:left-5 w-[50px] h-[50px] rounded-full bg-[#9B0EE1CC] shadow-md 
     flex place-items-center  cursor-pointer z-50 hidden md:block ">
        <img className="mt-1.5"  src={Jet}/>
        </div>

        <div className="fixed hidden md:block top-[310px]  md:right-0 lg:right-5 w-[50px] h-[110px]
         flex flex-col justify-between  z-50 ">
            <button onClick={setNight} className=" w-[50px] h-[50px] rounded-full flex place-items-center justify-center cursor-pointer"><img src={DarkMode}/></button>
            <button className=" w-[50px] h-[50px] rounded-full flex place-items-center justify-center cursor-pointer"><img src={Microfon}/></button>
        </div>
    </>
 )
}

export default jet