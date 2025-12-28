// import "../assets/style/tailwinds/tailwindSt(header).css"
import SearchBox from "./searchBox.jsx"
import {useParams,useLocation} from "react-router-dom"
import {useState} from "react"
import Navbar from "./Navbar.jsx"

const courseHeader=({viewPage})=>{

  const {id} = useParams();

   const getPageTitle = (pathname) => {
    switch(pathname) {
      case "/contentPage/courseContent": return "دوره های آموزشی ما";
      case "/contentPage/teacherContent": return "با برترین استاد های جهان اشنا شو" ;
      case "/contentPage/newsContent": return "خبر های داغ دریچه ای به دنیای تازه ها";
      default: return "دوره های آموزشی ما";
    }
  };
   const getPageTit = (pathname) => {
    switch(pathname) {
      case "/contentPage/courseContent": return "با هر دوره،یک قدم جلوتر";
      case "/contentPage/teacherContent": return "با هر خبر،از همه جلوتر" ;
      case "/contentPage/newsContent": return "با هر استاد یک موفقیت";
      default: return "دوره های آموزشی ما";
    }
  };
  const location = useLocation();
const pageTitle = getPageTitle(location.pathname);
const pageTit = getPageTit(location.pathname);
return(
  <div className="courseHeader  flex flex-col place-items-center ">

   {/* <div className="header w-[85%] h-[50px] border border-blue-500 mt-3 mb-8"></div> */}
   <Navbar  />
     
     {!id &&<SearchBox pageTitle={pageTitle} pageTit={pageTit} />}
    
    </div>
    )
}
export default courseHeader