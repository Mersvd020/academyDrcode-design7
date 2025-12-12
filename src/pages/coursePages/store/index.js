// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appCourse/getData', async params => {
  const response = await axios.get(
    "https://sepehracademy.liara.run/Course/CourseList",
    { 
      params: {
        PageNumber: 1, /// اینجا باگ داره 
        RowsOfPage: 1000,
        SortingCol: params?.sortingCol || 'DESC',
        Query: params?.q || '',
        ...params
      }
    }
  )

  console.log(response.data.courseDtos);

  return {
    params,
    data: response.data.courseDtos || [],
    allData: response.data.courseDtos || [],
    totalPages: response.data.totalCount || 0
  }
})


export const deleteCourse = createAsyncThunk(
  'appCourse/deleteCourse',
  async({ Id, activing }, { dispatch, getState }) => {
    
    
    const token = localStorage.getItem('token')
    console.log("Payload:", Id, activing,token)
    
    try{ 
      const response = await axios.put(
        "https://sepehracademy.liara.run/Course/DeleteCourse",
       {
        active: activing,
        id: Id
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      );
      
      console.log("deleteWork", response.data)
      
     
      await dispatch(getData(getState().course.params))
      
      return { Id, activing }
      
    } catch(error) {
      console.log("Error details:", error.response?.data)
      console.log("Error status:", error.response?.status)
      throw error
    }
  }
)

export const activeCourse = createAsyncThunk(
  'appCourse/activeCourse',
  async({ Id, activing }, { dispatch, getState }) => {
    
    
    const token = localStorage.getItem('token')
    console.log("Payload:", Id, activing)
    
    try{ 
     const response = await axios.put(
      "https://sepehracademy.liara.run/Course/ActiveAndDeactiveCourse",
      {
        active: activing,
        id: Id
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
);
     
      console.log("activeWork", response.data)
      
     
      await dispatch(getData(getState().course.params))
      
      return { Id, activing }
      
    } catch(error) {
      console.log("Error details:", error.response?.data)
      console.log("Error status:", error.response?.status)
      throw error
    }
  }
)


export const setExpireCourse = createAsyncThunk(
  'appCourse/setExpireCourse',
  async({ Id, expire }, { dispatch, getState }) => {

     const token = localStorage.getItem('token')
    console.log("expireWorked:", Id, expire, token)
   
    
    try{ 
      const response = await axios.put(
        "https://sepehracademy.liara.run/Course/SetExpireCourse",
        {
          active: expire,
          id: Id
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      console.log("Expire Work!", response.data)
      

      await dispatch(getData(getState().course.params))
      
      return { courseId, expire }
      
    } catch(error) {
      console.log("Error details:", error.response?.data)
      console.log("Error status:", error.response?.status)
      throw error
    }
  }
)


export const appCourseSlice = createSlice({
  name: 'appCourse',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.allData = action.payload.allData
        state.total = action.payload.totalPages
        state.params = action.payload.params
        state.loading = false
      })
      .addCase(getData.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.loading = false
      })
      .addCase(setExpireCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(setExpireCourse.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(setExpireCourse.rejected, (state) => {
        state.loading = false
      })
  }
})

export default appCourseSlice.reducer