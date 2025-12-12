// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getNewsData = createAsyncThunk('appCourse/getNewsData', async params => {
  
  const token = localStorage.getItem('token')
  const response = await axios.get(
    "https://sepehracademy.liara.run/News",
    { 
      params: {
        PageNumber: 1, /// اینجا باگ داره 
        RowsOfPage: 1000,
        SortingCol: params?.sortingCol || 'insertDate',
        SortType: "DESC" ,
        // Query: " ",
        // NewsCategoryId: 0,
        ...params
      },
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }
  )

  console.log(response.data.news);

  return {
    params,
    data: response.data.news || [],
    allData: response.data.news || [],
    totalPages: response.data.news || 0
  }
})

export const activeCourse = createAsyncThunk(
  'news/activeCourse',
  async({ Id, activing }, { dispatch, getState }) => {
      try{  
        

       const formData = new FormData()
        formData.append('Id', Id)
        formData.append('Active', activing)
        
       console.log("Payload:", Id, activing)
       const token = localStorage.getItem('token')
    
     const response = await axios.put(
      "https://sepehracademy.liara.run/News/ActiveDeactiveNews",
       formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      }
       );
     
      console.log("activeWork", response.data)
      
     
      await dispatch(getNewsData(getState().news.params))
      
      return { Id, activing }
      
    } catch(error) {
      console.log("Error details:", error.response?.data)
      console.log("Error status:", error.response?.status)
      throw error
    }
  }
)

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


export const appCourseSlice = createSlice({
  name: 'appCourse',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNewsData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.allData = action.payload.allData
        state.total = action.payload.totalPages
        state.params = action.payload.params
      })
      // .addCase(deleteCourse.fulfilled, (state, action) => {
        
      // })
  }
})

export default appCourseSlice.reducer