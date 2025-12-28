import axios from 'axios'
import apiClient from '../hook/interceptor' 
import formDataApiClient from "../hook/interceptorFormData"


////////////////// API => get

export const fetchCourseList = async ({ 
    pageNumber = 1, 
    rowsOfPage = 9, 
    sortingCol = 'active', 
    sortType = 'desc',
    techCount = 0
} = {}) => {
    const response = await apiClient.get('/Home/GetCoursesWithPagination', {
        params: {
            PageNumber: pageNumber,
            RowsOfPage: rowsOfPage,
            SortingCol: sortingCol,
            SortType: sortType,
            TechCount: techCount
        }
    });
    
    return {
        courses: response.data.courseFilterDtos || [],
        totalCount: response.data.totalCount || 0
    };
}


export const fetchCourseDetail =async ({queryKey}) =>{
    
    const [,id] = queryKey

    const response = await apiClient.get(`https://sepehracademy.liara.run/Home/GetCourseDetails?CourseId=${id}`);
    return response.data
}

export const fetchCourseComment = async({queryKey}) =>{
     
    const [,id] =queryKey 

    const response = await apiClient.get(`/Course/GetCourseCommnets/${id}`);
    return response.data
}

export const fetchReplyComment = async({queryKey}) =>{
     
    const [,Comment,id] =queryKey 

    const fetchReply =  await Promise.all(
      Comment.map(async el =>
       apiClient.get(`https://sepehracademy.liara.run/Course/GetCourseReplyCommnets/${id}/${el.id}`),
        ) 
         );

    const response = fetchReply.reduce((acc, r) => [...acc, ...r.data], []);

    return response
       
}




////////////////////////////// API=> post put delete




/////post

export const setCourseFav = async({courseId}) =>{
    
    const response = await apiClient.post(`/Course/AddCourseFavorite`,{
         courseId: courseId,
    });
    return response.data
}


export const setCourseRate = async ({courseId, rate}) => {
    console.log('API Call:', courseId, rate);
    
    const response = await apiClient.post(
        `/Course/SetCourseRating?CourseId=${courseId}&RateNumber=${rate}`
    );
    return response.data;
}


export const setLikeCourse = async({courseId}) =>{

    const response = await apiClient.post(`/Course/AddCourseLike?CourseId=${courseId}`);
    return response.data
}

export const setDisLikeCourse = async({courseId}) =>{

    const response = await apiClient.post(`/Course/AddCourseDissLike?CourseId=${courseId}`);
    return response.data
}


export const setCommentCourse =async({courseId,replyText})=>{
     
    const formData = new FormData();
    formData.append('CourseId', courseId);
    formData.append('Title', replyText);
    formData.append('Describe', replyText); 
    const response = await formDataApiClient.post("https://sepehracademy.liara.run/Course/AddCommentCourse", formData
    );

    return response.data
}

export const setCommentReplyCourse = async({CommentId,courseId,replyText})=>{

    // console.log("commentReplID:",CommentId)

    const formData = new FormData();
    formData.append('CommentId', CommentId);
    formData.append('CourseId',courseId);
    formData.append('Title', replyText); 
    formData.append('Describe', replyText); 
    const  response = await formDataApiClient.post("https://sepehracademy.liara.run/Course/AddReplyCourseComment",formData
    );

    return response.data
}

export const LikeComment = async({commentId})=>{
  
    const response = await apiClient.post(
      `https://sepehracademy.liara.run/Course/AddCourseCommentLike?CourseCommandId=${commentId}`
    );

    return response.data
}

export const DisLikeComment = async({commentId})=>{
  
     const response = await apiClient.post(
      `https://sepehracademy.liara.run/Course/AddCourseCommentDissLike?CourseCommandId=${commentId}`
    );

    return response.data
}


/////////delete

export const deleteFavCourse = async({userFavoriteId}) =>{
    // console.log(userFavoriteId)
     const formData = new FormData();
      formData.append("CourseFavoriteId",userFavoriteId)
    const response = await formDataApiClient.delete(`/Course/DeleteCourseFavorite`,
        {
          data: formData
        }
    );
    return response.data
}


export const deleteLikeCourse = async({userLikeId}) =>{
    // console.log(userLikeId)
     const formData = new FormData();
      formData.append("CourseLikeId",userLikeId)
    const response = await formDataApiClient.delete(`/Course/DeleteCourseLike`,
        {
          data: formData
        }
    );
    return response.data
}

export const deleteDisLikeCourse = async({userDissLikeId}) =>{
    // console.log(userDissLikeId)
     const formData = new FormData();
      formData.append("CourseDissLikeId",userDissLikeId)
    const response = await formDataApiClient.delete(`/Course/DeleteCourseDissLike`,
        {
          data: formData
        }
    );
    return response.data
}

export const deleteLikeComment = async({commentId})=>{
    
    const response = await apiClient.delete(`/Course/DeleteCourseCommentLike?CourseCommandId=${commentId}`);
    return response.data

}









