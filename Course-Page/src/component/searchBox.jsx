import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import vectLeft from "../assets/icon/vectLeft.png";
import vectRight from "../assets/icon/vectRight.png";
import square from "../assets/back/Squre.png";
import SearchIcon from "../assets/icon/searchIcon.png";
import Favorite from "../assets/icon/Heart.png"
import Star from "../assets/icon/Star.png"
import Education from "../assets/icon/Education.png"
import Calender from "../assets/icon/Calender.png"
import Vector from "../assets/icon/Vector.png"
import axios from "axios"

const SearchBox = ({ pageTitle, pageTit, onSearchResults }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
 const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://sepehracademy.liara.run/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=1000&SortingCol=Active&SortType=DESC&TechCount=0"
      );
   
      
      
      const courses = response.data.courseFilterDtos || [];
      setAllCourses(courses);
      
     
      if (onSearchResults) {
        onSearchResults(courses);
      }
    } catch (error) {
      console.error("خطا در دریافت دوره‌ها:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);


  const handleSearch = (value) => {
    if (!value.trim()) {
      
      if (onSearchResults) {
        onSearchResults(allCourses);
      }
      return;
    }

   
    if (!Array.isArray(allCourses) || allCourses.length === 0) {
      if (onSearchResults) {
        onSearchResults([]);
      }
      return;
    }

    const searchTerm = value.toLowerCase();

    const filtered = allCourses.filter((course) => {
      if (!course) return false;

     
      const title = course.title?.toLowerCase() || "";
      const teacherName = course.teacherName?.toLowerCase() || "";
      const courseTypeName = course.courseTypeName?.toLowerCase() || "";
      const courseLevelName = course.courseLevelName?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        teacherName.includes(searchTerm) ||
        courseTypeName.includes(searchTerm) ||
        courseLevelName.includes(searchTerm)
      );
    });

   
    if (onSearchResults) {
      onSearchResults(filtered);
    }
  };

 
  const handleSearchClick = () => {
    handleSearch(searchValue);
  };

  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div ref={searchRef} className="searchBox relative w-[90%] md:w-[45%] lg:[35%] h-[64%] mb-10">
      <img
        src={square}
        className="w-[85px] md:w-[120px] absolute left-[-20px] top-[30px] z-[1]"
        alt="square decoration"
      />

      <div className="searchTitle w-[50%] m-auto text-center font-semibold">
        <p className="flex flex-row justify-around items-center text-[8px] md:text-[13px] text-gray-600 mb-2">
          <img className="w-[10%]" src={vectRight} alt="arrow right" />
          {pageTit}
          <img className="w-[10%]" src={vectLeft} alt="arrow left" />
        </p>
        <h1 className="md:text-[20px] text-[14px]">{pageTitle}</h1>
      </div>

      <div className="search w-[80%] h-[45px] m-auto mt-4 flex flex-row justify-between rounded-[3px]">
        <input
          className="searchInput w-[87.5%] h-[45px] pr-3 border-3 rounded-s-[5px] border-[#3C8B85] border-e-0 outline-none"
          placeholder="دنبال چه دوره هایی هستی؟..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowResults(true);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowResults(true)}
          disabled={loading}
        />
        <button
          className="searchBt w-[12%] h-[45px] bg-[#3C8B85] rounded-e-[5px] z-[3] hover:bg-[#2d6b66] transition-colors disabled:opacity-50"
        >
            <img className="m-auto" src={SearchIcon} alt="search icon" />
          
        </button>
      </div>


      {searchValue && showResults && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[130px] w-[90%] max-w-[900px] bg-white rounded-lg shadow-2xl z-[200] border border-gray-200 h-[500px] overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div>
              {loading ? (
                <span className="text-gray-600">در حال جستجو...</span>
              ) : (
                <span className="text-gray-700 font-semibold">
                  {allCourses.filter((course) => {
                    const searchTerm = searchValue.toLowerCase();
                    const title = course.title?.toLowerCase() || "";
                    const teacherName = course.teacherName?.toLowerCase() || "";
                    return title.includes(searchTerm) || teacherName.includes(searchTerm);
                  }).length}{" "}
                  دوره یافت شد
                </span>
              )}
            </div>
            <button 
              onClick={() => setShowResults(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex gap-4 pb-2 h-[400px]">
              {loading ? (
                <div className="flex items-center justify-center w-full h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3C8B85]"></div>
                </div>
              ) : (
                allCourses
                  .filter((course) => {
                    const searchTerm = searchValue.toLowerCase();
                    const title = course.title?.toLowerCase() || "";
                    const teacherName = course.teacherName?.toLowerCase() || "";
                    return title.includes(searchTerm) || teacherName.includes(searchTerm);
                  })
                  .map((course) => (
                    <div
                      key={course.courseId}
                      className="min-w-[280px]  rounded-[45px] max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all cursor-pointer flex-shrink-0"
                      onClick={() => {
                        window.location.href = `/contentPage/courseDetail/${course.courseId}`;
                      }}
                    >
                      <div className="relative overflow-hidden h-full ">
                        <img
                          src={course.tumbImageAddress || "/cover5.png"}
                          alt={course.title}
                          className="w-full h-full p-1 rounded-[45px]"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/cover5.png";
                          }}

                        />
                      <div className="p-4 h-[200px] font-bold w-[97%] bg-transparent rounded-b right-[5px] rounded-b-[45px]  backdrop-blur absolute bottom-[3px] ">
                        <div className="flex justify-between  items-start mb-3">
                          <h4 className="font-bold text-[white] text-[20px] leading-tight flex-1 line-clamp-2">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                            <span className="text-[15px] font-bold text-yellow-700">
                              {course.currentRegistrants || 1}
                            </span>
                            <img src={Star}/>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[white] text-xs mb-3">
                          <div className="flex items-center gap-1">
                           <img src={Education}/>
                            <span>{course.teacherName}</span>
                          </div>
                          <div className="flex items-center text-[white] gap-1">
                             <img src={Vector}/>
                            <span>{course.courseLevelName || "دانش آموز"}</span>
                            
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[white] mb-4">
                           <img src={Calender}/>
                          <span>{course.lastUpdate?.slice(0, 10) || "2025-10-20"}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex flex-row">
                            
                            <span className="text-lg font-bold text-[white]">
                              {course.cost || "1000"}
                            </span>
                            <span className="text-[15px] text-purple-500">تومان</span>
                          </div>
                          <button 
                            className="border-2 border-[white] rounded-[45px] hover:bg-[white] hover:text-[black] text-white text-xs px-4 py-2"
                            onClick={(e) => {
                              navigate(`/contentPage/courseDetail/${course.courseId}`)
                            }}
                          >
                            مشاهده دوره
                          </button>
                        </div>
                      </div>
                      
                        <button 
                          className="absolute top-3 right-3 border-2 border-[gray]/30  w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 group"
                          
                        >
                          <img src={Favorite}/>
                        </button>
                      </div>
                      
                     
                    </div>
                  ))
              )}
              
              {!loading && allCourses.filter((course) => {
                const searchTerm = searchValue.toLowerCase();
                const title = course.title?.toLowerCase() || "";
                const teacherName = course.teacherName?.toLowerCase() || "";
                return title.includes(searchTerm) || teacherName.includes(searchTerm);
              }).length === 0 && (
                <div className="w-full text-center py-12 text-gray-500">
                  <p className="text-lg">هیچ دوره‌ای یافت نشد </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;