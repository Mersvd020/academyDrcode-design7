// courseContent.jsx
import { useState } from "react";
import ProductCard from "../../component/course/productCard.jsx";
import FilterSide from "../../component/filterSide.jsx";
import SortingBox from "../../component/sortingBox.jsx";
import View1 from "../../assets/icon/view1.png";
import View1v1 from "../../assets/icon/view1.v1.png";
import View2 from "../../assets/icon/view2.png";
import View2v2 from "../../assets/icon/view2.v2.png";
import FilterIco from "../../assets/icon/filter.png";

import { useQuery } from "@tanstack/react-query";
import { fetchCourseList } from "../../API/course.js";

import { useSelector } from "react-redux";

const CourseContent = () => {

////darkmode

 const {darkMode} = useSelector(
    (state)=> state.darkmode
 );

 console.log(darkMode);



    const [view, setView] = useState("view1");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    
    const [filters, setFilters] = useState({
        category: "",
        priceRange: [0, 100000000],
        courseLevel: "",
        teacher: "",
        sortBy: "",
    });

    const [range, setRange] = useState([0, 100000000]);
    const [filterNull, setFilterNull] = useState(true);
    const [activeFilters, setActiveFilters] = useState(0);
    const [filterBt, setFilterBt] = useState(false);

 
    const updateActiveFilters = (currentFilters) => {
        let count = 0;
        if (currentFilters.category) count++, setFilterNull(false);
        if (currentFilters.courseLevel) count++, setFilterNull(false);
        if (currentFilters.sortBy) count++, setFilterNull(false);
        if (currentFilters.teacher) count++, setFilterNull(false);
        if (
            currentFilters.priceRange[0] > 0 ||
            currentFilters.priceRange[1] < 100000000
        )
            count++, setFilterNull(false);
        if (count === 0) setFilterNull(true);
        setActiveFilters(count);
    };



    ///// courseList 
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['courses', currentPage, itemsPerPage, filters.sortBy, filters.sortType],
        queryFn: () => fetchCourseList({
            pageNumber: currentPage,
            rowsOfPage: itemsPerPage,
            sortingCol: 'active',
            sortType: 'desc'
        }),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });
   ////////

    const courses = data?.courses || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
 ///////////////////
    // console.log(courses);



    ///sorting
    const SortCourse = [...courses].sort((a, b) => {
       if (filters.sortBy === "جدید ترین") return new Date(b.startTime) - new Date(a.endTime);
      if (filters.sortBy === "محبوب ترین") return Math.round(b?.courseRate?.avg) - Math.round(a?.courseRate?.avg);
      if (filters.sortBy === "ارزان ترین") return a.cost - b.cost;
       if (filters.sortBy === "گران ترین") return b.cost - a.cost;
      return 0;
    });

   ///filter
    const filteredCourses = SortCourse.filter((course) => {
       
        if(filters.category && !course.technologyList.includes(filters.category)){
          return false
        }
        
       
        if (course.cost < filters.priceRange[0] || course.cost > filters.priceRange[1]) {
            return false;
        }
        
       
        if (filters.teacher && course.teacherName !== filters.teacher) {
            return false;
        }
        
        
        if (filters.courseLevel && course.levelName !== filters.courseLevel) {
            return false;
        }
        
        return true
    });

  ////quick action function
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);//for pagination
        window.scrollTo({ top: 100, behavior: "smooth" });
    };
////////////
    

 ///// pagination button
    const renderPageButtons = () => {
        const buttons = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        disabled={isFetching}
                        className={`w-8 h-8 text-center rounded transition ${
                            currentPage === i
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        } ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {i}
                    </button>
                );
            }
        }
         else {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    disabled={isFetching}
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
                    <span key="dots1" className="w-8 h-8 flex items-center justify-center">
                        ...
                    </span>
                );
            }
            
            ///!!!!!!IMPORTANT CONDITION
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        disabled={isFetching}
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
                    <span key="dots2" className="w-8 h-8 flex items-center justify-center">
                        ...
                    </span>
                );
            }

            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={isFetching}
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

    const ViewBt = {
        border: "0",
        borderRadius: "5px",
        height: "25px",
        cursor: "pointer",
        boxShadow: "0 0 10px #9B0EE140",
    };

    return (
        <div className={`flex justify-center pb-50 gap-[20px]`}>
            <FilterSide
                setFilters={setFilters}
                filters={filters}
                setRange={setRange}
                range={range}
                setFilterNull={setFilterNull}
                filterNull={filterNull}
                updateActiveFilters={updateActiveFilters}
                setActiveFilters={setActiveFilters}
                activeFilters={activeFilters}
                filterBt={filterBt}
            />

            <div className="lg:w-[960px] md:w-[clamp(700px,60%,1200px)] min-h-[1200px]">
                <div className="shadow-md shadow-purple-200 h-[50px] bg-white rounded-[5px] mb-[10px] flex justify-between items-center gap-5">
                    <div className="group rounded-[5px] p-[3px] leading-[25px] relative text-sm text-[#444] mr-[10px]">
                        {!filterBt && (
                            <SortingBox
                                filters={filters}
                                setFilters={setFilters}
                                updateActiveFilters={updateActiveFilters}
                                filterBt={filterBt}
                            />
                        )}

                        <button
                            type="button"
                            className="relative block lg:hidden border border-gray-300 rounded-lg p-2 text-sm text-white cursor-pointer flex items-center bg-[#9B0EE1]"
                            onClick={() => setFilterBt(!filterBt)}
                        >
                            <img src={FilterIco} alt="Filter" />
                            فیلتر ها
                        </button>
                    </div>

                    <div className="flex flex-row gap-[10px] ml-[10px]">
                        <div
                            style={ViewBt}
                            className={view === "view2" ? "bg-[#9B0EE1]" : ""}
                            onClick={() => setView("view2")}
                        >
                            <img src={view === "view2" ? View2v2 : View2} alt="View 2" />
                        </div>
                        <div
                            style={ViewBt}
                            className={view === "view1" ? "bg-[#9B0EE1]" : ""}
                            onClick={() => setView("view1")}
                        >
                            <img src={view === "view1" ? View1 : View1v1} alt="View 1" />
                        </div>
                    </div>
                </div>

              
                {isLoading && (
                    <div className="flex justify-center items-center h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
                    </div>
                )}

                
                {isError && (
                    <div className="flex justify-center items-center h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 text-xl mb-4">خطا در بارگذاری دوره‌ها</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                            >
                                تلاش مجدد
                            </button>
                        </div>
                    </div>
                )}

               
                {!isLoading && !isError && (
                    <>
                        <div id="grid" className={`${view} ${isFetching ? 'opacity-60' : ''}`}>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((card) => (
                                    <ProductCard
                                        key={card.courseId}
                                        price={card.cost}
                                        id={card.courseId}
                                        name={card.title}
                                        like={card.likeCount || 0}
                                        category={card.levelName}
                                        teacher={card.teacherName}
                                        Img={card.imageAddress || card.tumbImageAddress || "/cover3.png"}
                                        date={card.startTime}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-10">
                                    <p className="text-xl">هیچ دوره‌ای با این فیلترها یافت نشد</p>
                                </div>
                            )}
                        </div>

                      
                        {totalPages > 1 && (
                            <div className="w-full p-5 flex justify-center items-center mt-6 space-x-2 space-x-reverse">
                                <button
                                    type="button"
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isFetching}
                                    className={`w-8 h-8 text-center rounded transition ${
                                        currentPage === 1 || isFetching
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    &lt;
                                </button>

                                {renderPageButtons()}

                                <button
                                    type="button"
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || isFetching}
                                    className={`w-8 h-8 text-center rounded transition ${
                                        currentPage === totalPages || isFetching
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    &gt;
                                </button>
                            </div>
                        )}

                        <div className="text-center text-sm text-gray-600 mt-4">
                            نمایش {filteredCourses.length} از {totalCount} دوره
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseContent;