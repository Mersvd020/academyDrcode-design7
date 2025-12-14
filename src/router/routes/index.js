// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";


// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));

const CourseList = lazy(()=> import("../../pages/coursePages/courseList"));
const MyCourseList = lazy(()=> import("../../pages/coursePages/myCourseList"))
const CoursePreview = lazy(()=> import("../../pages/coursePages/coursePreview"))
const ReservedList = lazy(()=> import("../../pages/coursePages/reservedList"))  
const CreateNewCourse = lazy(()=> import("../../pages/createNewCourse"))
const TimeList = lazy(()=> import("../../pages/coursePages/timeList"))

const NewsList = lazy(()=> import("../../pages/newsPages/newsList")) 
const CatNewsList = lazy(()=> import("../../pages/newsPages/newsCatList"))
const CreateNewNews = lazy(()=> import("../../pages/createNewNews"))
const NewsPreview = lazy(()=> import("../../pages/newsPages/newsPreview"))
const NewsCatCreate = lazy(()=> import("../../pages/createNewsCat"))
const NewsCatEdit = lazy(()=> import("../../pages/editNewsCat"));

///////////////////////////////////////////////////////////
 const Users = lazy(()=> import("../../pages/user/user/list"));
 const UsersPreview = lazy(()=> import("../../pages/user/user/view"))
///////////////////////////////////////////////////////////
const CommentPage = lazy(() => import("../../pages/commentPage"));
///////////////////////////////////////////////////////////
const OstadYaranFehrest  = lazy(()=> import("../../pages/OstadYaran/OstadYaranFehrest"))
const OstadYaranEdit = lazy(()=> import("../../pages/OstadYaran/OstadYaranEdit"))
const OstadYaranCreate = lazy(()=> import("../../pages/OstadYaran/OstadYaranCreate"))
const AddToCourse = lazy(()=> import("../../pages/OstadYaran/AddToCourse"))
const EditSocialGroup = lazy(()=> import("../../pages/coursePages/coursePreview/EditSocialGroup"))
const AddSocialGroup = lazy (()=> import("../../pages/coursePages/coursePreview/AddSocialGroup"))
import Profile from "../../pages/Profile";
///////////////////////////////////////////////////////////
const DepartmentsCreate = lazy(()=> import("../../pages/Departments/DepartmentsCreate"))
const DepartmentsEdit = lazy(()=> import("../../pages/Departments/DepartmentsEdit"))
const DepartmentsList = lazy(()=> import("../../pages/Departments/DepartmentsList"))
///////////////////////////////////////////////////////////
const BuildingsCreate = lazy(()=> import("../../pages/Buildings/BuildingsCreate"))
const BuildingsEdit = lazy(()=> import("../../pages/Buildings/BuildingsEdit"))
const BuildingsList = lazy(()=> import("../../pages/Buildings/BuildingsList"))
///////////////////////////////////////////////////////////


const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Sample = lazy(() => import("../../pages/Sample"));
///////////////////////////////////////////////////////////
const Login = lazy(() => import("../../pages/authentication/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));


// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to="/login" />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  ///course
  {    
       element:<CourseList/>,
       path:"/course/list"
      
  },
  {
    path:"/course/preview/:id",
    element:<CoursePreview/>
  },
   {
    path:"social-group/edit/:id",
    element:<EditSocialGroup/>
  },
   {
    path:"social-group/add",
    element:<AddSocialGroup/>
  },
  {
    path:"/course/reserved-list",
    element:<ReservedList/>
  },
  {
    path:"/course/myCourse-list",
    element:<MyCourseList/>
  },
  {
     path:"/course/create-Course",
     element:<CreateNewCourse/>
  },
   {
     path:"/course/time-list",
     element:<TimeList/>
  },
  //  {
  //   path:"/course/preview2/:id",
  //   element:<CoursePreview2/>
  // },


  ////news
  {
     path:"/news/list",
     element:<NewsList/>
  },
  {
     path:"/news/catlist",
     element:<CatNewsList/>
  },
  {
    path:"/news/create-NewsCat",
    element:<NewsCatCreate/>
  },
  {
    path:"/news/edit-NewsCat/:id",
    element:<NewsCatEdit/>
  },
   {
     path:"/news/create-News",
     element:<CreateNewNews/>
  },
   {
    path:"/news/preview/:id",
    element:<NewsPreview/>
  },
  

 
/// comment
  {
    path: "/comments/list",
    element: <CommentPage />,
  },


  ///user
  {
    path: "/users/list",
    element: <Users />,
  },
  {
     path:"/users/view/:id",
     element:<UsersPreview/>,
  },

  //// departments teacher buildings dashboard

  ,
   {
     path:"/ostad-yaran",
     element:<OstadYaranFehrest />
  },

  {
    path: '/ostad-yaran/edit/:id',
    element: <OstadYaranEdit />
  },
  {
    path: '/ostad-yaran/create',
    element: <OstadYaranCreate />
  },
  {
    path: '/ostad-yaran/add-to-course/:assistanceId',
    element: <AddToCourse />
  },
{
    path: '/departments',
    element: <DepartmentsList />
  },
  {
    path: '/departments/create',
    element: <DepartmentsCreate />
  },
  {
    path: '/departments/edit/:id',
    element: <DepartmentsEdit />
  },
  {
    path: '/buildings',
    element: <BuildingsList />
  },
  {
    path: '/buildings/create',
    element: <BuildingsCreate />
  },
  {
    path: '/buildings/edit/:id',
    element: <BuildingsEdit />
  },
{
  path: '/profile',
  element: <Profile />
},

  

  {
    path: "/second-page",
    element: <SecondPage />,
  },


  {
    path: "/sample",
    element: <Sample />,
  },
















  
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
