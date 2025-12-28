import {useEffect, useState} from "react"
import SortingBox from "../../component/sortingBox"
import T1 from "../../assets/teacherAvatar/t1.png"
import T2 from "../../assets/teacherAvatar/t2.png"
import T3 from "../../assets/teacherAvatar/t3.png"
import T4 from "../../assets/teacherAvatar/t4.png"
import Linkdin from "../../assets/icon/linkdin.png"
import axios from "axios"
import TeachDetail from "../../component/teacher/teacherDetail"
const teacherContent = ({}) =>{  

     const [filterBt,setFilterBt] = useState(true);
     const[showSort,setShowSort] = useState(false);
     const [filters, setFilters] = useState({
	  sortBy:'',
     });

     const sorts = [
        {id:1 , name : "بر اساس دوره"},
        {id:2 , name : "بر اساس مقاله"},
	 ]
       

      const[teacherList,setTeacherList] = useState([]);
      const[teacherDetail,setTeacherDetail] = useState([]);
      const[showDetail,setShowTeacherDetail] = useState('');

     useEffect(()=>{
        const teacherll= async()=>{
           try{
        const fechteacher = await axios.get("https://sepehracademy.liara.run/Home/GetTeachers");
         const Data = fechteacher.data;
           setTeacherList(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      teacherll(); 
     },[]);

      
        const teacherDetaile= async(showDetail)=>{
           try{
        const fechteacher = await axios.get(`https://sepehracademy.liara.run/Home/GetTeacherDetails?TeacherId=${showDetail}`);
         const Data = fechteacher.data;
           setTeacherDetail(Data);
        }catch(error){
          console.error("Error fetching teacher details:", error);
        }
      };


     
     
      
      /////////////////////
     const SortTeacher = [...teacherList].sort((a, b) => {
      if (filters.sortBy === "بر اساس دوره") return b.courseCounts - a.courseCounts;
      if (filters.sortBy === "بر اساس مقاله") return b.articale - a.articale;
      return 0;
    });

     const handleSortChange = (Srtt) => {
		 const newSort = filters.sortBy === Srtt ? '' : Srtt;
         setFilters({...filters, sortBy :newSort});
        };

    
     
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 12;  
   
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
 
const currentItems = Array.isArray(SortTeacher) && SortTeacher.length > 0
  ? SortTeacher.slice(indexOfFirstItem, indexOfLastItem) 
  : [];


const totalPages = Array.isArray(SortTeacher) && SortTeacher.length > 0
  ? Math.ceil(SortTeacher.length / itemsPerPage)
  : 0;  


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 100, behavior:"smooth"});
  };


    

    return(
     <div className=" flex  justify-center gap-[20px]">
   
     
  {/* className="sm:w-[clamp(700px,60%,1200px)] lg:w-[clamp(800px,60%,1200px) xl:w-[clamp(850px,60%,1200px)]" */}
  <div className=" w-[85%] min-h-[500px] pb-50">  

    <div className=" shadow-md shadow-purple-200 h-[50px] bg-white rounded-[5px] mb-[10px] flex justify-between items-center gap-5">

	<div className="rounded-[5px] p-[3px] leading-[25px] relative text-sm text-[#444] mr-[10px]">  
      <div className={`sort relative lg:block ${filterBt ? "":"hidden"}`}>
         <div
         className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 cursor-pointer flex justify-between items-center hover:bg-gray-50"
           onClick={() => setShowSort(!showSort)}
           
         >
           <span>{  filters.sortBy || 'مرتب سازی بر اساس'}</span>
           <span className="text-xs">▼</span>
         </div>
         
         {showSort && (
           <ul className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg z-50 border border-gray-200">
             {sorts.map((Srt) => (
               <li key={Srt.id}>
                 <label
                   className={`block rounded-[5px] px-4 py-2 text-sm cursor-pointer hover:bg-teal-500 hover:text-white ${
                      filters.sortBy === Srt.name ? '!bg-orange-500 !text-white' : ''
                   }`}
                   onClick={() => {
                     handleSortChange(Srt.name);
                     setShowSort(false);
                   }}
                 >
                   {Srt.name}
                 </label>
               </li>
             ))}
           </ul>
         )}
         
       </div>
         
         </div>
         </div>
         

         <div className="teacherBox mt-5 w-full flex lg:flex-row lg:flex-wrap flex-col items-center gap-[15px] ">
            {currentItems.map((teach)=>(
                <div key={teach.teacherId} className=" relatvie shadow-md flex flex-row items-center lg:w-[24%] w-[80%] h-[130px] rounded-[15px]">
                    <img className=" mr-4 ml-1 h-[70%] w-[30%] rounded-full" src={teach.pictureAddress} />
                    <div className="relative  h-[80%]">
                        <span className=" font-medium m-auto h-[30%] text-right  text-[14px]">{teach.fullName}</span>
                        <p className=" text-[gray]/50 h-[30%] text-[9px] lg:text-[12px]"><img className="w-[15px] h-[15px] inline" src={Linkdin} />{teach.linkdinProfileLink}</p>
                        <button onClick={()=>{teacherDetaile(teach.teacherId);setShowTeacherDetail(teach.teacherId)}} className=" text-[blue]/50 h-[30%] w-[100px] text-[12px] bg-[gray]/10 px-2 rounded-[10px]">پروفایل استاد</button>
                    </div>
                  {showDetail == teach.teacherId && ( 
                    <TeachDetail
                      tImage={teacherDetail.pictureAddress}
                      tName = {teacherDetail.fullName}
                      title={(teacherDetail.departaman?.name)}
                      setShowTeacherDetail={setShowTeacherDetail}
                      courseCount={teach.courseCounts}
                    />
            
               )}
                </div>
            ))}

        
         </div>


       
      <div className="pagebuttons w-full p-5 flex justify-center mt-6 space-x-2">

        <button type="submit" onClick={()=>currentPage !=1 && setCurrentPage(currentPage -1)}
          className={` w-8 h-8 text-center  rounded ${
              currentPage === 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}>{"<"}</button>
        {Array.from({ length: totalPages }, (_,i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={` w-8 h-8 text-center  rounded ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
         <button type="submit" onClick={()=>totalPages != currentPage && setCurrentPage(currentPage + 1)} 
          className={` w-8 h-8 text-center  rounded ${
              currentPage === totalPages
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}>{">"}</button>
      </div>
        
    </div>	

         </div>
    //  </div>

    //  </div>
       
    )

}
export default teacherContent