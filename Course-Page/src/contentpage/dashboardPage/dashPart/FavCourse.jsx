import Srch from "../../../assets/icon/search.png"
import ReactJs from "../../../assets/cardImg/reactJs.png"
import SortingBox from "../../../component/dashComponent/sortingBox(dash)"
import Show from "../../../assets/icon/show.png"
import FilterIco from "../../../assets/icon/filter.png"
import { useEffect, useState } from "react";
import apiClient from "../../../hook/interceptor"
import  Delete from "../../../assets/icon/Delete.png"
import toast from "react-hot-toast"
import axios from "axios"
import ShowFavCourseDetail from "../../../component/dashComponent/showFavCourseDetail"
import {Link,Outlet,useNavigate,useLocation,useParams} from "react-router-dom"
const FavCourse = () => {
  const [courseData, setCourseData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showCourseDetail, setShowCourseDetail] = useState(null); 
    
    ///////////////////////////////////
   const[showSort,setShowSort] = useState(false);
   const [filters, setFilters] = useState({
    sortBy: "",
  });

	 const sorts = [
        {id:1 , name : "جدید ترین"},
        {id:2 , name : "تایید شده"},
        
	 ]

       const handleSortChange = (Srtt) => {
		 const newSort = filters.sortBy === Srtt ? '' : Srtt;
         setFilters({...filters, sortBy :newSort});
		//  updateActiveFilters({ ...filters, sortBy: newSort });
      };

   const SortCourse = [...courseData].sort((a, b) => {
      if (filters.sortBy === "جدید ترین") return  new Date(b?.course?.startTime) -  new Date(a?.course?.startTime);
      if (filters.sortBy === "تایید شده") return b.accept - a.accept;
      return 0;
    });

 


  ////////////////////////////
  
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(
        "/SharePanel/GetMyFavoriteCourses"
      );

      console.log("response:", response.data);

      setCourseData(response.data.favoriteCourseDto || []);
      setFilteredData(response.data.favoriteCourseDto || []);
    } catch (error) {
      console.log("error fetching:", error);
    }
  };

  fetchProduct();
}, []);


const deleteFavCourse = async (ResId) => {
  try {
    const token = localStorage.getItem('token');
     
    const formData = new FormData();
    formData.append("CourseFavoriteId", String(ResId)); 
    
    const deleteRes = await axios.delete(
      "https://sepehracademy.liara.run/Course/DeleteCourseFavorite",
      {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    toast.success("دوره از لیست مورد علاقه حذف شد");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    
  } catch (error) {
    console.error("خطا", error.response?.data);
      toast.error("خطا");
  
  }
}

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCard = Array.isArray(SortCourse)
    ? SortCourse.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(SortCourse.length / itemsPerPage);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 100, behavior:"smooth"});
  };

 
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5; 

    if (totalPages <= maxVisible) {
     
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 text-center rounded ${
              currentPage === i
                ? "bg-[#3C8B85] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 text-center rounded ${
            currentPage === 1
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          1
        </button>
      );
 
      if (currentPage > 3) {
        buttons.push(
          <span
            key="dots1"
            className="w-8 h-8 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 text-center rounded ${
              currentPage === i
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      }

     
      if (currentPage < totalPages - 2) {
        buttons.push(
          <span
            key="dots2"
            className="w-8 h-8 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-8 h-8 text-center rounded ${
            currentPage === totalPages
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };
  const [filterBt, setFilterBt] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchValue]);


  
  const handleSearch = (value) => {
    if (!value.trim()) {
      setFilteredData(courseData);
      return;
    }

    const filtered = courseData.filter((item) => {
      
    if (!item) return false;

   
    const name = item.courseTitle?.toLowerCase() || '';
    const teacheName = item.teacheName?.toLowerCase() || '';
    const searchTerm = value.toLowerCase();

    return (
      name.includes(searchTerm) ||
      teacheName.includes(searchTerm)
    );
    });

    setFilteredData(filtered);
  };
  ///////////////////////////////

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

  return (
    <>
    {showCourseDetail && (
        <>
          
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCourseDetail(null)}
          />
          
          <ShowFavCourseDetail
            id={showCourseDetail} 
            setShowCourseDetail={setShowCourseDetail}
          />
        </>
      )}
      
      <div dir="ltr" className="w-full h-[40px] mb-2 flex flex-row justify-between lg:hidden">
        <button
          type="submit"
          className="relative border border-gray-300 rounded-lg p-2 text-sm text-white cursor-pointer flex items-center bg-[#9B0EE1]"
          onClick={() => setFilterBt(!filterBt)}
        >
          <img src={FilterIco} />
          فیلتر ها
        </button>

        <div className="w-[100px] h-full text-black/80 text-center flex items-right text-[15px] font-bold">
        {pageTitle}
        </div>
      </div>

      
      <div className="bg-white font-medium w-full h-[15%] rounded-t-[25px] lg:flex hidden flex-row items-center gap-[20px]">
        <div className="w-[20%] mr-5 h-[70%] flex flex-col justify-between">
          <span className="text-gray-500 w-full">جستجو دوره</span>
          <input
            type="text"
            placeholder="جستجو ..."
             value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ backgroundImage: `url(${Srch})` }}
            className="border border-gray-300 indent-[30px] text-black bg-[#F5F5F5] bg-[length:20px_20px] bg-no-repeat bg-[position:right_5px_center] w-full h-[35px] rounded-[5px]"
          />
        </div>

        <div className="w-[10%] h-[70%] flex flex-col justify-between">
          <span className="text-gray-500">تاریخ شروع</span>
          <input type="date" className="border border-gray-400 bg-[#F5F5F5] h-[35px] text-black rounded-[5px]" />
        </div>

        <div className="w-[10%] h-[70%] flex flex-col justify-between">
          <span className="text-gray-500">تاریخ پایان</span>
          <input type="date" className="border border-gray-400 bg-[#F5F5F5] h-[35px] rounded-[5px]" />
        </div>

        <div className="w-[15%] h-[70%] flex flex-col justify-between">
          <span className="text-gray-500">ترتیب</span>
          

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

      
      <div className="bg-white w-full h-[85%] rounded-b-[25px]">
       
         <div className="w-full bg-[#F5F5F5] h-[40px] font-medium lg:text-[15px] text-[10px] pb-[10px] text-gray-600 hidden lg:flex flex-row">
                  <div className="h-full flex items-center mr-2 w-[25%]">عکس و نام دوره</div>
                  <div className="h-full flex items-center w-[15%]">نام استاد</div>
                  <div className="h-full flex items-center w-[15%]">تاریخ شروع</div>
                  <div className="h-full flex items-center w-[15%]">تاریخ پایان</div>
                  <div className="h-full flex items-center w-[15%]">قیمت</div>
                  <div className="h-full flex items-center w-[17%]">وضعیت ثبت نام</div>
                </div>
        
               
                <div className="commentContent w-full font-medium whitespace-nowrap flex flex-col rounded-b-[25px]">
                                {currentCard.map((card) => (
                        <div
                            key={card.id}
                            className="w-full lg:h-[70px] h-[120px] text-gray-500 border-b border-gray-300 flex flex-row items-center"
                        >
                            
                            <div className="h-full ml-3 lg:ml-0 w-[30%] lg:w-[24%] mr-3 flex flex-row items-center gap-5">
                            <img
                            onError={(e) => {e.currentTarget.onerror = null ;e.currentTarget.src ="/cover3.png"}} 
                                src={card.imageAddress || "/cover3.png"}
                                className="rounded-[15px] h-[80%] w-full lg:w-[30%]"
                            />
                            <span className="text-black lg:block hidden w-[45%]">
                                {card.courseTitle}
                            </span>
                            </div>
        
                            
                            <div className="flex lg:flex-row  flex-col w-[50%] lg:w-[52%]">
                            
                             <span className="text-black lg:hidden block w-[45%]">
                                {card.courseTitle}
                            </span>
        
                            
                            <span className="w-[33%] lg:w-[30%]">
                                {card.teacheName}
                            </span>
        
                           
                            <span className="w-[33%] lg:w-[30%] hidden lg:block">
                                {card?.course?.startTime?.slice(0, 10)}
                            </span>
        
                            
                            <span className="w-[33%] lg:w-[30%] hidden lg:block">
                                {card?.lastUpdate?.slice(0, 10)}
                            </span>
        
                            
                            <span className="w-[33%] lg:w-[15%] text-black">
                                <span className="text-gray-500 lg:inline hidden">{card.cost || "؟"} تومان</span>
                                <span className={`border-2 lg:hidden block text-[10px] text-center border rounded-2xl ${card?.accept ? "text-[green] bg-[green]/30":"  border-[gray]/30 bg-gray-300"}  `}>
                                {card?.course?.active ? "تایید شده": "در انتظار تایید"}
                            </span>
                            </span>
                            </div>
                  
                             <div className="lg:flex hidden lg:flex-row  justify-center flex-col w-[50%] mr-8  lg:w-[15%]">
                            <span className={`border-2 p-1 border rounded-4xl ${card?.course?.active ? "text-[green] bg-[green]/30":"  border-[gray]/30 bg-gray-300"}  `}>
                                {card?.course?.active ? "تایید شده": "در انتظار تایید"}
                            </span>
                            </div>
        
        
                             <span className=" flex flex-row justify-between lg:w-[5%] lg:gap-0 gap-2 lg:mt-0 lg:ml-0 ml-2 mt-5 ">
                               <button onClick={()=> deleteFavCourse(card?.favoriteId)}> <img className="" src={Delete} /></button>
                               <button onClick={() => setShowCourseDetail(card?.courseId)}> <img className="" src={Show} /></button>
                            
                             </span>
                        </div>
                        ))}
                </div>
       
        <div className="pagebuttons w-full p-5 flex justify-center mt-6 space-x-2">
            <button
              type="submit"
              onClick={() =>
                currentPage != 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`w-8 h-8 text-center rounded ${
                currentPage === 1
                  ? "bg-[#3C8B85] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {"<"}
            </button>

            {renderPageButtons()}

            <button
              type="submit"
              onClick={() =>
                totalPages != currentPage && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`w-8 h-8 text-center rounded ${
                currentPage === totalPages
                  ? "bg-[#3C8B85] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {">"}
            </button>
          </div>
      </div>
    </>
  );
};

export default FavCourse;