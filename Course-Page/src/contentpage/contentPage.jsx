import Header from "../component/header.jsx"
import Footer from "../component/footer.jsx"
import QuickAction from "../component/quickAction.jsx"

import "../assets/style/tailwinds/tailwindSt(content).css"

import CourseContent from "./coursePage/courseContent.jsx"
import NewsContent from "./newsPage/newsContent.jsx"
import CourseDetail from "./coursePage/courseDetail.jsx"
import TeacherContent from "./teacherPage/teacherContent.jsx"

import Squre2 from "../assets/back/squre2.png"
import Squre3 from "../assets/back/squre3.png"
import {useState} from "react"
import {Link,Outlet,useParams} from "react-router-dom"

import {useSelector} from "react-redux"

const coursePage = ()=>{
 
    const[nightMode,setNightMode] = useState(false);

    const {darkMode} = useSelector(
        (state)=> state.darkmode
    )

//  className={`${nightMode ? "bg-[black]/100": "bg-[#F5F5F5]"}`}

    return(
        <div className={`${darkMode ? "bg-[black]/100": "bg-[#F5F5F5]"}`}>

            <img src={Squre2} className="absolute  top-[500px] left-[0]"/>
            <img src={Squre3} className="absolute  top-[800px] right-[0]"/>
        <QuickAction
         setNightMode={setNightMode}
          nightMode={nightMode}
         />
        <Header/>
         <div>
            <Outlet/>
         </div >
        <Footer/>
        </div>
    )
}
export default coursePage