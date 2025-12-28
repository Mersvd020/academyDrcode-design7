import ProductCard from "./productCard"
import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"

const productList=({filters,filterNull,range,currentItems,setCourseData})=>{

// const[Product,setProduct] = useState([]);
// const {id} = useParams();
  
//       // console.log("Product:",Product);
//       useEffect( ()=>{
//         const fetchProduct = async ()=>{
//           try{  
//             const response = await axios.get("https://sepehracademy.liara.run/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10&SortingCol=active&SortType=desc&TechCount=0");
//         const data = await response.data.courseFilterDtos;
//             setProduct(data);
//             // console.log("data",data);
        
//           }catch(error){
//            console.error('خطا در دریافت داده:', error);
//           }
//          }
        
//         fetchProduct()
//       },[]);

    

    const mockCourse = [
      {id : 1 , name : "ریکت" ,level: 'مقدماتی' ,like: 20,date:"2025-10-01",category: 'دوره ریکت',sortBy:"جدید ترین", price : 50000000,teacher: 'استاد میثم'},
      {id : 2 , name : "ریکت" ,level :'متوسط' ,like: 30,date:"2025-08-01",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 25000000,teacher: 'استاد میثم'},
      {id : 3 , name : 'دوره بک‌اند' ,level:'پیشرفته',date:"2025-10-09",like: 30 ,category: 'دوره ریکت',sortBy:"گران ترین", price : 30000000,teacher: 'استاد میثم'},
      {id : 4 , name : "ریکت" ,level:'پیشرفته',like: 30,date:"2025-05-23" ,category: 'دوره بک‌اند',sortBy:"ارزان ترین", price : 5000000,teacher: 'استاد بحرالعلوم'},
      {id : 5 , name : 'UX دوره ' ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'UX دوره ',sortBy:"محبوب ترین", price : 10000000,teacher: 'استاد صبح خیز'},
      {id : 6 , name : 'UX دوره ' ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 40000000,teacher: 'استاد میثم'},
      {id : 7 , name : "ریکت" ,level: 'مقدماتی',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"جدید ترین", price : 23000000,teacher: 'استاد میثم'},
      {id : 8 , name : 'UX دوره ' ,level :'متوسط',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 21000000,teacher: 'استاد میثم'},
      {id : 9 , name : "ریکت" ,level:'پیشرفته' ,like: 30,date:"2025-05-23",category: 'دوره ریکت',sortBy:"گران ترین", price : 15000000,teacher: 'استاد میثم'},
      {id : 10 , name : "ریکت" ,level:'پیشرفته',like: 30,date:"2025-05-23", category: 'دوره بک‌اند',sortBy:"ارزان ترین", price : 1000000,teacher: 'استاد بحرالعلوم'},
      {id : 11 , name : "ریکت" ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'UX دوره ',sortBy:["گران ترین","محبوب ترین"], price : 5000000,teacher: 'استاد صبح خیز'},
      {id : 12 , name : 'UX دوره ' ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher: 'استاد میثم'},
      {id : 13 , name : "ریکت" ,level:'پیشرفته' ,like: 30,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher: 'استاد میثم'},
      {id : 14 , name : "ریکت" ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher:  'استاد بحرالعلوم'},
      {id : 15 , name : 'دوره بک‌اند' ,level:'پیشرفته' ,like: 30,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher:  'استاد بحرالعلوم'},
      {id : 16 , name : "ریکت" ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher:  'استاد بحرالعلوم'},
      {id : 17 , name : 'دوره بک‌اند' ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher:  'استاد بحرالعلوم'},
      {id : 18 , name : "ریکت" ,level:'پیشرفته',like: 30 ,date:"2025-05-23",category: 'دوره ریکت',sortBy:"محبوب ترین", price : 20000000,teacher: 'استاد میثم'},
    ]


  //   const SortCourse = [...mockCourse].sort((a, b) => {
  //   if (filters.sortBy === "گران ترین") return b.price - a.price;
  //   if (filters.sortBy === "ارزان ترین") return a.price - b.price;
  //   if (filters.sortBy === "محبوب ترین") return b.like - a.like;
  //   if (filters.sortBy === "جدید ترین") return new Date(b.date) - new Date(a.date);
  //   return 0;
  // });

     const SortCourse = [...Product].sort((a, b) => {
    if (filters.sortBy === "گران ترین") return b.cost - a.cost;
    if (filters.sortBy === "ارزان ترین") return a.cost - b.cost;
    if (filters.sortBy === "محبوب ترین") return b.likeCount - a.likeCount;
    if (filters.sortBy === "جدید ترین") return new Date(b.date) - new Date(a.date);
    return 0;
  });



  const FilteredCourse = SortCourse.filter((el) => {
  
  const matchCategory = 
    !filters.category || el.courseLvlId === filters.category;

  const matchLevel = 
    !filters.courseLevel || el.levelName === filters.courseLevel;

  const matchTeacher = 
    !filters.teacher || el.teacherName === filters.teacher;

  // const matchSort = 
  //   !filters.sortBy || el.sortBy === filters.sortBy;

  const matchPrice = 
    el.cost >= filters.priceRange[0] && 
    el.cost <= filters.priceRange[1];

  return (
    matchCategory &&
    matchLevel &&
    matchTeacher &&
    // matchSort &&
    matchPrice
  );
});

  //   const FilteredCourse = SortCourse.filter((el) => {
  // const matchCategory =
  //   !filters.category || el.category === filters.category;

  // const matchLevel =
  //   !filters.courseLevel || el.level === filters.courseLevel;

  // const matchTeacher =
  //   !filters.teacher || el.teacher === filters.teacher;

  // // const matchSort =
  // //   !filters.sortBy || el.sortBy === filters.sortBy;

  // const matchPrice =
  //   el.price >= filters.priceRange[0] &&
  //   el.price <= filters.priceRange[1];

  //      return (
  //        matchCategory &&
  //        matchLevel &&
  //        matchTeacher &&
  //       //  matchSort &&
  //        matchPrice
  //      );
  //    });

   useEffect(()=>{
    setCourseData(FilteredCourse);
   },[filters,Product,id]);
    

    return(
          <>
         {currentItems.map((card)=>(
            <ProductCard
            //  key={Card.id}
            //  Id = {Card.id}
            //  name = {Card.name}
            //  category={Card.category}
            //  sortBy={Card.sortBy}
            //  price={Card.price}
            //  teacher={Card.teacher}
            //  like={Card.like}
            //  date={Card.date}

            key={card.courseId}
            price={card.cost}
            id={card.courseId}
            name={card.title}
            like={card.likeCount}
            category={card.levelName}
            teacher={card.teacherName}
            Img={card.imageAddress || card.tumbImageAddress}
            date={card.startTime}
          />
        ))}

        <div></div>
               

           </>

    )
}
export default productList