import Course from "../../assets/icon/course.png"
import Articale from "../../assets/icon/articale.png"
import Oscar from "../../assets/icon/oscar.png"
import Tel from "../../assets/icon/tel.png"
import Mes from "../../assets/icon/mes.png"
import Ins from "../../assets/icon/ins.png"


const TeachDetail = ({tImage , tName , title,setShowTeacherDetail,courseCount}) => {
    
    return( 
        <>
        <div className="lg:w-[450px]  w-[80%] drop-shadow rounded-[25px]
              lg:absolute  fixed top-1/4 left-8 lg:right-[550px] bg-white p-5 z-10 shadow-lg shadow-gray-300">
                 <button onClick={()=>setShowTeacherDetail('')}  className=" absolute top-3 left-3  font-medium flex items-center gap-1 w-[50px] mb-2 px-2 text-red-300 text-[12px] border  hover:bg-gray-200 rounded-[5px] transition">بستنx</button>
                 <div className=" flex flex-col items-center  m-auto mt-5">
                    <img className=" w-[130px] h-[130px] rounded-full mb-3" src={tImage} />
                    <span className=" text-[18px]  font-medium mb-2">{tName}</span>
                    <span className=" text-[14px]  text-[gray]/50 mb-2">{title}</span>
                     <div className="flex lg:flex-row gap-5 font-medium flex-col items-center whitespace-nowrap">
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] "><img src={Course} className="w-[15px] h-[15px] ml-1"/>{courseCount}دوره</span>
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] "><img src={Articale} className="w-[15px] h-[15px] ml-1"/>{` ${5} `}مقاله تخصصی</span>
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] "><img src={Oscar} className="w-[15px] h-[15px] ml-1"/>دارنده اسکار برترین استاد</span>
                     </div>
                      <div className="flex flex-row gap-2 font-medium mt-10  items-center whitespace-nowrap">
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] ml-1 ">راه های ارتباطی</span>
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] ml-1 "><img src={Tel} className="w-[25px] h-[25px]"/></span>
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] ml-1 "><img src={Mes} className="w-[25px] h-[25px]"/></span>
                        <span className="lg:h-full  w-[full] flex flex-row items-center text-[black]/70 text-[11px] ml-1 "><img src={Ins} className="w-[25px] h-[25px]"/></span>
                     </div>
                     
                 </div>
              </div>
        </>
    )
}

export default TeachDetail;