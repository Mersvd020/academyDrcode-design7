// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getReservedData = createAsyncThunk(
  'appCourseReserve/getReservedData', 
  async (params) => {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      "https://sepehracademy.liara.run/CourseReserve",
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    console.log('Course Reserve Response:', response.data)

    
    return {
      data: response.data,
      allData: response.data,
      total: response.data.length
    }
  }
)

export const appCourseReserveSlice = createSlice({
  name: 'appCourseReserve',
  initialState: {
    data: [],
    allData: [],
    total: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getReservedData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.allData = action.payload.allData
        state.total = action.payload.total
        console.log('Data loaded:', action.payload)
      })
  }
})

export default appCourseReserveSlice.reducer