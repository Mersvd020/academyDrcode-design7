import React from "react";
import {useEffect,useState} from "react"
import axios from "axios"
import icon from "../../assets/landPagePic/icon.png"
import icon2 from "../../assets/landPagePic/icon2.png"
import icon3 from "../../assets/landPagePic/icon3.png"
import icon4 from "../../assets/landPagePic/icon4.png"
import apiClient from "../../hook/interceptor"


   

const StatsSection = ({nightMode}) => {
   const [report,setReport] = useState();
  useEffect(()=>{
      
    const fetchReport = async ()=>{
      try{
       const fetch = await axios.get("https://sepehracademy.liara.run/Home/LandingReport");
       const data = fetch.data;
       setReport(data);
      }catch(error){
        console.log("error landing report",error)
      }
       
    }
    fetchReport();
  },[])

  const [Product, setProduct] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(
          "https://sepehracademy.liara.run/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=1000&SortingCol=active&SortType=desc&TechCount=0",
          {
            header: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data.courseFilterDtos;
        setProduct(data);
      } catch (error) {
        console.error("خطا در دریافت داده:", error);
      }
    };

    fetchProduct();
  }, []);

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


 const[teacherList,setTeacherList] = useState([]);

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

const [user,setUser] = useState([]); 

     useEffect(()=>{
        const Userall= async()=>{
           try{
        const fechUser = await axios.get("https://sepehracademy.liara.run/User/UserMannage?PageNumber=1&RowsOfPage=1000&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=1");
         const Data = fechUser.data;
           setUser(Data);
        }catch(error){
          console.error("Error fetching teachers:", error);
        }
      };
      Userall(); 
     },[]);
   
  const stats = [
  { id: 1, number: 0, title: "دوره های", highlight: "خفن", color: "purple", icon: icon4 },
  { id: 2, number: 0, title: "اساتید", highlight: "حرفه ای", color: "gray", icon: icon3 },
  { id: 3, number: 0, title: "اخبار", highlight: "جدید", color: "blue", icon: icon2 },
  { id: 4, number: 0, title: "دانشجو", highlight: "زرنگ", color: "green", icon: icon },
];

stats[0].number = Product?.length;
stats[2].number = News?.length;
stats[1].number = teacherList?.length;
stats[3].number = user?.totalCount;
   
    
  return (
    <section className="flex lg:flex-row flex-wrap lg:mr-20  items-center justify-center lg:gap-0 gap-20" dir="ltr">
      {stats.map((item) => (
        <div key={item.id} className={` ${nightMode ? "text-[white] ": "text-[black]"}   flex  lg:flex-row-reverse flex-col  lg:w-[20%] w-[30%] items-center gap-5 `}>
      
       <div
  className={`flex items-center justify-center w-24 h-24 rounded-full bg-${item.color}-100`}
>
  <img src={item.icon} alt={item.title} className="w-15 h-15" />
</div>

          <div className="flex flex-col items-end">
  <p className="text-2xl font-bold">{item.number}</p>
  <p className="text-gray-700">{item.title}</p>
  <span className={`text-${item.color}-600 text-sm font-semibold`}>
    {item.highlight}
  </span>
</div>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;