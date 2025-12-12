// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appCourse/getData', async params => {
  const response = await axios.get(
    "https://sepehracademy.liara.run/Course/CourseList",
    { 
      params: {
        PageNumber: params?.page || 1,
        RowsOfPage: params?.perPage || 1000,
        SortingCol: params?.sortingCol || 'DESC',
        Query: params?.q || '',
        ...params
      }
    }
  )
  
  return {
    params,
    data: response.data.courseDtos || [],
    allData: response.data.courseDtos || [],
    totalPages: response.data.totalCount || 0
  }
})

export const updateCourse = createAsyncThunk(
  'appCourse/updateCourse',
  async (courseData, { dispatch, getState, rejectWithValue }) => {
    try {
      const formData = new FormData()
      
      const fields = [
        'Id',
        'Title',
        'Describe',
        'MiniDescribe',
        'Capacity',
        'CourseTypeId',
        'SessionNumber',
        'CurrentCoursePaymentNumber',
        'TremId',
        'ClassId',
        'CourseLvlId',
        'TeacherId',
        'Cost',
        'UniqeUrlString',
        'Image',
        'StartTime',
        'EndTime',
        'GoogleSchema',
        'GoogleTitle',
        'CoursePrerequisiteId',
        'ShortLink',
        'TumbImageAddress',
        'ImageAddress'
      ]
      
      fields.forEach(key => {
        if (courseData[key] !== null && courseData[key] !== undefined && courseData[key] !== '') {
          formData.append(key, courseData[key])
          console.log(`FormData: ${key} = ${courseData[key]}`)
        }
      })

      const token = localStorage.getItem('token')  
      const response = await axios.put(
        'https://sepehracademy.liara.run/Course',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      
      console.log('response:', response.data)
      
      
      await dispatch(getData(getState().course.params))
      
      return response.data
    } catch (error) {
      console.error('api error:', error)
      console.error('error response:', error.response?.data)
      console.error('error status:', error.response?.status)
      
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      })
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
    loading: false,
    error: null
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
      .addCase(updateCourse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCourse.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default appCourseSlice.reducer