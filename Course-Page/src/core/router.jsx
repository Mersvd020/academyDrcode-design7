import {createBrowserRouter} from "react-router-dom"
import ContentPage from "../contentpage/contentPage"
import CourseContent from "../contentpage/coursePage/courseContent"      
import CourseDetail from "../contentpage/coursePage/courseDetail"
import TeacherContent from  "../contentpage/teacherPage/teacherContent"
//////////////////////////////////////////////////////////////////////
import LandingPage from "../contentpage/landingPage"
/////////////////////////////////////////////////////////
import AuthLayout from '../layouts/login/AuthLayout';
import PhoneLogin from '../pages/login/PhoneLogin';
import EmileLogin from '../pages/login/EmileLogin';
import VerifyCode from '../pages/login/VerifyCode';
import AuthLayoutReg from '../layouts/register/AuthLayoutReg';
import StepOwn from '../pages/register/stepOwn';
import StepTwo from '../pages/register/stepTwo';
import StepThree from '../pages/register/stepThree';
import AuthLayoutRespass from '../layouts/resspass/AuthLayoutRespass';
import StepOwnres from '../pages/resspass/stepOwnres';
import StepTowres from '../pages/resspass/stepTowres';
import NewsContent from "../contentpage/newsPage/newsContent.jsx"
import NewsDetail from "../contentpage/newsPage/newsDetail.jsx"
///////////////////////////////////////////////////////////////////
import DashHome from "../contentpage/dashboardPage/dashHome.jsx"
import Dashboard from "../contentpage/dashboardPage/dashPart/dashboard.jsx"
import DashCourse from "../contentpage/dashboardPage/dashPart/dashCourse.jsx"//
import FavCourse from "../contentpage/dashboardPage/dashPart/FavCourse.jsx"
import MyReserve from "../contentpage/dashboardPage/dashPart/MyReserve.jsx"
import FavNews from "../contentpage/dashboardPage/dashPart/FavNews.jsx"
import Profile from "../contentpage/dashboardPage/dashPart/profile.jsx"
 import Info from "../contentpage/dashboardPage/dashPart/profilePart/Information.jsx"
 import Address from "../contentpage/dashboardPage/dashPart/profilePart/address.jsx"
 import ProfImg from "../contentpage/dashboardPage/dashPart/profilePart/imgProfile.jsx"
 import Telegram from "../contentpage/dashboardPage/dashPart/profilePart/telegram.jsx"
///////////////////////////////////////////////////////////////
import Page404 from "../component/404.jsx"

import ProtectedRoute from "../component/protectRoute.jsx";


const router = createBrowserRouter([
    {path:"/",element:<LandingPage/>}, 


     {path:"/contentPage",element:<ContentPage/>, children:[
        {path:"courseContent",element:<CourseContent/>},
        {path:"courseDetail/:id",element:<CourseDetail/>},
        {path:"newsContent",element:<NewsContent/>},
        {path:"newsDetail/:id",element:<NewsDetail/>},
        {path:"teacherContent",element:<TeacherContent/>},
    ]},

     { path: "/authLayout", element: <AuthLayout />, children: [
      { index: true, element: <PhoneLogin /> },
      { path: "PhoneLogin", element: <PhoneLogin /> },
      { path: "EmileLogin", element: <EmileLogin /> },
      { path: "VerifyCode", element: <VerifyCode /> },

    ]},

     { path: "Reg", element: <AuthLayoutReg />, children: [
      { index: true, element: <StepOwn /> },
      { path: "stepOwn", element: <StepOwn /> },
      { path: "stepTwo/:emile", element: <StepTwo /> },
      { path: "stepThree", element: <StepThree /> },
       ],
      },

      { path: "ress", element: <AuthLayoutRespass />, children: [
      { index: true, element: <StepOwnres /> },
      { path: "StepOwnres", element: <StepOwn /> },
      { path: "StepTowres/:code", element: <StepTowres /> },
       ],
     },

     {path:"/dashboard",element: 
     (
     <ProtectedRoute>
      <DashHome/>
     </ProtectedRoute>
     )
     ,children:[
      {index:true,element:<Dashboard/>},
      {path:"dash",element:<Dashboard/>},
      {path:"dashcourse",element:<DashCourse/>},
      {path:"FavCourse",element:<FavCourse/>},
      {path:"MyReserve",element:<MyReserve/>},
      {path:"FavNews",element:<FavNews/>},

      {path:"profile",element:<Profile/>, children:[
         {index:true,element:<Info/>},
         {path:"information",element:<Info/>},
         {path:"link",element:<Telegram/>},
         {path:"imgProfile",element:<ProfImg/>},
         {path:"address",element:<Address/>}
      ]},

     ]},


     

     {path:"*",element:<Page404/>}
  
 
   
    
    
    
   
])
export default router