import { Mail, Home, Airplay, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  // {
  //   id: "secondPage",
  //   title: "Second Page",
  //   icon: <Mail size={20} />,
  //   navLink: "/second-page",
  // },
  {
        header : "صفحات سایت",
  },
  {
    id: "course",
    title: "دوره ها",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "courseList",
        title: "لیست دور ها",
        icon: <Circle size={12} />,
        navLink: "/course/list",
      },
       {
        id: "courseList",
        title: "لیست دوره های شما",
        icon: <Circle size={12} />,
        navLink: "/course/myCourse-list",
      },
       {
        id: "ReservedList",
        title: "لیست رزرو",
        icon: <Circle size={12} />,
        navLink: "/course/reserved-list",
      },
       {
        id: "courseList",
        title: "ساخت دوره های جدید",
        icon: <Circle size={12} />,
        navLink: "/course/create-Course",
      },
       {
        id: "courseList",
        title: "لیست زمانبندی",
        icon: <Circle size={12} />,
        navLink: "/course/time-list",
      },
     
    ],
  },
  {
    id: "News",
    title: "اخبار و مقالات",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "NewsList",
        title: "لیست اخبار",
        icon: <Circle size={12} />,
        navLink: "/news/list",
      },
       {
        id: "NewsList",
        title: "ایجاد اخبار جدید",
        icon: <Circle size={12} />,
        navLink: "/news/create-News",
      },
       {
        id: "NewsList",
        title: "لیست دسته بندی",
        icon: <Circle size={12} />,
        navLink: "/news/catlist",
      },
       
    ],
  }
  ,
  {
    id: "Ostad",
    title: "استاد یاران",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "OstadList",
        title: "فهرست استاد یاران",
        icon: <Circle size={12} />,
        navLink: "/ostad-yaran",
      },
      
        {
        id: "CreateList",
        title: "وظایف استادیاران",
        icon: <Circle size={12} />,
        navLink: '/ostad-yaran/create',
      },
    ],
  },
  {
    id: "departments",
    title: "دپارتمان",
    icon: <Airplay size={20} />,
    navLink: "/departments",
  
  },
  {
    id: "building",
    title: "بیلدینگ ها",
    icon: <Airplay size={20} />,
    navLink: "/buildings",
  
  },
  
  ,
  {
    id: "comments",
    title: "نظرات دوره",
    icon: <Circle size={20} />,
    navLink: "/comments/list",
  },

  {
    id: "users",
    title: "کاربران",
    icon: <Circle size={20} />,
    navLink: "/users/list",
  }
];
