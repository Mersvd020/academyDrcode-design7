import {useState,useEffect} from "react"
import axios from "axios"
import NewsCard from "../../component/news/newsCard.jsx"
import SortingBox from "../../component/sortingBox.jsx"
import SortingBoxNews from "../../component/sortingBoxNews.jsx"
import View1 from "../../assets/icon/view1.png"
import View1v1 from "../../assets/icon/view1.v1.png"
import View2 from "../../assets/icon/view2.png"
import View2v2 from "../../assets/icon/view2.v2.png"
import FilterIco from "../../assets/icon/filter.png"


const newsContent = () => {
   const[view,setview] = useState("view1");

	const ViewBt = {
       border: '0',
       borderRadius: '5px',
       height: '25px',
       cursor: 'pointer',
       boxShadow: '0 0 10px #9B0EE140'
    };

  ////////////////////////////////////////////////////////
  //api
  const[News,setNews] = useState([]);
  //  const {id} = useParams();
  
      // console.log("News:",News);

      useEffect(()=>{
        const fetchNews = async ()=>{
          try{  
        const response = await axios.get("https://sepehracademy.liara.run/News?PageNumber=1&RowsOfPage=1000&SortingCol=InsertDate&SortType=DESC");
        const data = await response.data.news;
            setNews(data);
            // console.log("data",data);
        
          }catch(error){
           console.error('خطا در دریافت داده:', error);
          }
         }
        
        fetchNews()
      },[]);  
          console.log("NewsDate",new Date(News.insertDate));

        ////////////////////////////////////////////////
   ////filter data
	 const [filterNull,setFilterNull] = useState(true);
	  const [activeFilters, setActiveFilters] = useState(0);
    
    const [filters, setFilters] = useState({
    category: '',
	  sortBy:'',
    FromDate:'',
    ToDate:'',
     });
        console.log("cat",filters.category);
    //  console.log("From",filters.FromDate);
     console.log("to",new Date(filters.ToDate));

      const [showCategories, setShowCategories] = useState(false);
      const [catApi,setCat]=useState([]);

       useEffect(()=>{
     const catHandle =async ()=>{
      try{
        const categ = await axios.get(`https://sepehracademy.liara.run/News/GetListNewsCategory`);
        setCat(categ.data);
       }catch(error){console.log("ارور از دسته بندی",error)};

     }
     catHandle()
   },[])  

  const categories = [
    { id: 1,describe:"react" ,name: 'دوره ریکت'},
    { id: 2,describe:"ux" ,name: 'UX دوره ' },
    { id: 3,describe:"backend" ,name: 'دوره بک‌اند' },
    { id: 4,describe:"bahr" ,name: 'دوره بحر'}
  ];

   const handleCategoryChange = (category) => {
    const newCategory = filters.category === category ? '' : category;
    setFilters({ ...filters, category: newCategory });
    updateActiveFilters({ ...filters, category: newCategory });
  };

  const handleFromDateChange = (date) => {
    const newFromDate = date;
    setFilters({ ...filters, FromDate: newFromDate });
    updateActiveFilters({ ...filters, FromDate: newFromDate });
  };
  const handleToDateChange = (date) => {
    const newFromDate = new Date(date);
    setFilters({ ...filters, ToDate: newFromDate });
    updateActiveFilters({ ...filters, ToDate: newFromDate });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      sortBy:'',
   	  ToDate:'',
      FromDate:'',
      });
     setActiveFilters(0);
     setFilterNull(true);
     }; 

    

///////////////////////////////////////
 //sorting & filtering function     
    const SortCourse = [...News].sort((a, b) => {
      if (filters.sortBy === "محبوب ترین") return Math.round(b.newsRate.avg/b.newsRate.count) - Math.round(a.newsRate.avg/a.newsRate.count);
      if (filters.sortBy === "جدید ترین") return new Date(b.insertDate) - new Date(a.insertDate);
      return 0;
    });
       
     const FilteredCourse = SortCourse.filter((el) => {
     
     const matchCategory = 
       !filters.category || el.newsCatregoryName === filters.category; 

     const DateMatchTo =
     !filters.ToDate || new Date(el.insertDate) <= new Date(filters.ToDate);  
     const DateMatchFrom =
     !filters.FromDate || new Date(el.insertDate) >= new Date(filters.FromDate);  
        
       
     return (
       matchCategory&&
       DateMatchTo&&
       DateMatchFrom
      
       );
   });

    
  /////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
// filter update
	  const updateActiveFilters = (currentFilters) => {
      let count = 0;
      if (currentFilters.category) count++, setFilterNull(false);  
      if (currentFilters.ToDate || currentFilters.FromDate) count++, setFilterNull(false);   
    if(currentFilters.sortBy) count++ , setFilterNull(false);
    if(count === 0) setFilterNull(true);
    setActiveFilters(count);
  };

    

    const [filterBt,setFilterBt] = useState(false);
    // console.log(filterBt)
	
 
///////////////////////////////////////
  // console.log(courseData)

     
     
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;  
   
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
 
const currentItems = Array.isArray(FilteredCourse) && FilteredCourse.length > 0
  ? FilteredCourse.slice(indexOfFirstItem, indexOfLastItem) 
  : [];


const totalPages = Array.isArray(FilteredCourse) && FilteredCourse.length > 0
  ? Math.ceil(FilteredCourse.length / itemsPerPage)
  : 0;  

 
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
                ? "bg-purple-600 text-white"
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



///////////////////////////////////////////


return(
 <div className=" flex  justify-center pb-50 gap-[20px]">

                     
    <div className={`sm:w-[20%] md:w-[40%] lg:w-[23%] xl:w-[20%] w-[80%] lg:block absolute lg:relative z-[10] rounded-[20px]
        ${filterBt ? "block top-[320px] right-[45px]" : "hidden"}`}>
    <div className=" shadow-md shadow-purple-200 w-full bg-white rounded-[20px] py-[10px] text-[#555] flex flex-row flex-wrap">

     <div className="w-[90%] font-medium text-xs px-[10px] pb-[15px] border-b border-[#eee] m-[10px] flex justify-between items-center"> 

	<h2 className="text-[#9B0EE1]"> فیلتر  </h2>
	<span className="transition text-[10px] font-bold cursor-pointer hover:!text-green hover:scale-[1.1]"
     onClick={resetFilters}
      >
        حذف همه‌ی فیلتر ها({activeFilters})
        </span>
			
		</div>	

    
     <div className=" font-medium  rounded-[5px] p-[3px] w-[95%] pr-2">
       <label className="text-xs font-medium text-gray-700 block mb-3 pr-2">
         دسته‌بندی
       </label>
       
       <div className="relative">
         <div
         className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 cursor-pointer flex justify-between items-center hover:bg-gray-50"
           onClick={() => setShowCategories(!showCategories)}
           
         >
           <span>{filters.category || 'انتخاب کنید'}</span>
           <span className="text-xs">▼</span>
         </div>
         
         {showCategories && (
           <ul className="absolute top-full h-[110px] overflow-y-auto left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg z-50 border border-gray-200">
             {catApi.map((cat) => (
               <li key={cat.id}>
                 <label
                   className={`block px-4 py-2 text-sm cursor-pointer hover:bg-teal-500 hover:text-white ${
                     filters.category === cat.categoryName ? '!bg-orange-500 !text-white' : ''
                   }`}
                   onClick={() => {
                     handleCategoryChange(cat.categoryName);
                     setShowCategories(false);
                   }}
                 >
                   {cat.categoryName}
                 </label>
               </li>
             ))}
           </ul>
         )}
         
       </div>
     </div>

        <div className="w-[95%] mr-2 mb-2 mt-2">
    
        <h2 className=" text-xs mb-2 font-medium text-gray-700 ">تاریخ انتشار</h2>


      <div className="flex flex-row justify-between w-[full] h-[45px]  font-bold">

         <div className="w-[40%]  flex flex-col justify-between ">    
            <input type="date" onChange={handleFromDateChange}  className="border border-gray-400  bg-[#F5F5F5] h-full rounded-[5px]"/>
             </div>

        <div className=" w-[40%]  flex flex-col justify-between">
        
            <input type="date" onChange={handleToDateChange}  className="border border-gray-400  bg-[#F5F5F5] h-full rounded-[5px]"/>
        </div>

        
        </div>

        </div>

    
     <div className="sorting w-[90%] block md:hidden " >
       <label className="text-xs font-medium text-gray-700 block mb-3 pr-2">
         مرتب سازی
       </label>
      <SortingBoxNews
      filters={filters}
      setFilters={setFilters}
        updateActiveFilters={updateActiveFilters}
        filterBt={filterBt}
       />

     </div>

    </div>

	</div>
	
       
  {/* className="sm:w-[clamp(700px,60%,1200px)] lg:w-[clamp(800px,60%,1200px) xl:w-[clamp(850px,60%,1200px)]" */}

  <div className=" lg:w-[960px] md:w-[clamp(700px,60%,1200px)]  min-h-[1200px]">  

    <div className=" shadow-md shadow-purple-200 h-[50px] bg-white rounded-[5px] mb-[10px] flex justify-between items-center gap-5">

	<div className="group  rounded-[5px] p-[3px] leading-[25px] relative text-sm text-[#444] mr-[10px]">  

     
     {!filterBt &&<SortingBoxNews
       filters={filters}
       setFilters={setFilters}
      updateActiveFilters={ updateActiveFilters}
      filterBt={filterBt}
     /> 
       }

       <button type="submit" className=" relative block  lg:hidden
       border border-gray-300 rounded-lg p-2 text-sm text-white
        cursor-pointer flex align-items-center bg-[#9B0EE1]"
        onClick={()=>setFilterBt(!filterBt)}>
           <img src={FilterIco}/>
          فیلتر ها
       </button>
		 </div>



    <div className=" flex flex-row gap-[10px] ml-[10px]">
	<div style={ViewBt} className={view === "view2" ? "bg-[#9B0EE1]" : " "}  onClick={()=>setview("view2")}><img src={view === "view2" ? View2v2 : View2}/></div>  
	<div style={ViewBt} className={view === "view1" ? "bg-[#9B0EE1]" : " "}  onClick={()=>setview("view1")}><img src={view === "view1" ? View1 : View1v1}/></div>
    </div>
  </div>

    <div id="gridNews" className={view}>

    {currentItems.map((card)=>(
            <NewsCard 

             miniDescribe={card.miniDescribe}
            key={card.id}
            newsCatregoryName={card.newsCatregoryName}
            view={card.currentView}
            id={card.id}
            name={card.title}
            like={Math.round(card.newsRate.avg/card.newsRate.count ? card.newsRate.avg/card.newsRate.count : 0)}
            category={card.levelName}
            teacher={card.addUserFullNam}
            Img={card.currentImageAddress || card.currentImageAddressTumb || "/cover5.png"}
            date={card.startTime}
          />
        ))}

       
       <div className=" w-full p-5 flex justify-center mt-6 space-x-2">
            <button
              type="submit"
              onClick={() =>
                currentPage != 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`w-8 h-8 text-center rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {">"}
            </button>
          </div>
          </div>

	</div>
 </div>

    )

    
}
export default newsContent;