import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://sepehracademy.liara.run/AssistanceWork'
const ASSISTANCE_API_URL = 'https://sepehracademy.liara.run/CourseAssistance'


const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  return userData?.token || null
}

const getConfig = () => ({
  headers: {
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  }
})

export const getAssistanceWork = createAsyncThunk(
  'assistanceWork/getAssistanceWork', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getConfig())
      console.log('Fetched assistance work:', response.data)
      return response.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت اطلاعات')
    }
  }
)

export const createAssistanceWork = createAsyncThunk(
  'assistanceWork/createAssistanceWork',
  async (workData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, workData, getConfig())
      console.log('Created assistance work:', response.data)
      await dispatch(getAssistanceWork())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در ایجاد کار')
    }
  }
)

export const updateAssistanceWork = createAsyncThunk(
  'assistanceWork/updateAssistanceWork',
  async ({ id, workData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(API_URL, workData, getConfig())
      await dispatch(getAssistanceWork())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در بروزرسانی کار')
    }
  }
)

export const deleteAssistanceWork = createAsyncThunk(
  'assistanceWork/deleteAssistanceWork',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(API_URL, {
        ...getConfig(),
        data: { id }
      })

      await dispatch(getAssistanceWork())
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در حذف کار')
    }
  }
)


export const getCourseAssistance = createAsyncThunk(
  'assistanceWork/getCourseAssistance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ASSISTANCE_API_URL, getConfig())
      console.log('Fetched course assistance:', response.data)
      return response.data || []
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت لیست استادیاران')
    }
  }
)

export const createCourseAssistance = createAsyncThunk(
  'assistanceWork/createCourseAssistance',
  async (assistanceData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(ASSISTANCE_API_URL, assistanceData, getConfig())
      console.log('Created course assistance:', response.data)
      await dispatch(getCourseAssistance())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در ایجاد استادیار')
    }
  }
)

export const updateCourseAssistance = createAsyncThunk(
  'assistanceWork/updateCourseAssistance',
  async ({ id, assistanceData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`${ASSISTANCE_API_URL}/${id}`, assistanceData, getConfig())
      console.log('Updated course assistance:', response.data)
      await dispatch(getCourseAssistance())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در بروزرسانی استادیار')
    }
  }
)

export const deleteCourseAssistance = createAsyncThunk(
  'assistanceWork/deleteCourseAssistance',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${ASSISTANCE_API_URL}/${id}`, getConfig())
      console.log('Deleted course assistance:', id)
      await dispatch(getCourseAssistance())
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در حذف استادیار')
    }
  }
)

export const assistanceWorkSlice = createSlice({
  name: 'assistanceWork',
  initialState: {
    data: [],
    assistances: [],
    loading: false,
    assistanceLoading: false,
    error: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAssistanceWork.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAssistanceWork.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.error = null
      })
      .addCase(getAssistanceWork.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      

      .addCase(createAssistanceWork.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createAssistanceWork.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(createAssistanceWork.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
      

      .addCase(updateAssistanceWork.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateAssistanceWork.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(updateAssistanceWork.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
      

      .addCase(deleteAssistanceWork.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAssistanceWork.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(deleteAssistanceWork.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })




      .addCase(getCourseAssistance.pending, (state) => {
        state.assistanceLoading = true
        state.error = null
      })
      .addCase(getCourseAssistance.fulfilled, (state, action) => {
        state.assistanceLoading = false
        state.assistances = action.payload
        state.error = null
      })
      .addCase(getCourseAssistance.rejected, (state, action) => {
        state.assistanceLoading = false
        state.error = action.payload
      })



      .addCase(createCourseAssistance.pending, (state) => {
        state.assistanceLoading = true
        state.error = null
        state.success = false
      })
      .addCase(createCourseAssistance.fulfilled, (state) => {
        state.assistanceLoading = false
        state.success = true
        state.error = null
      })
      .addCase(createCourseAssistance.rejected, (state, action) => {
        state.assistanceLoading = false
        state.error = action.payload
        state.success = false
      })




      .addCase(updateCourseAssistance.pending, (state) => {
        state.assistanceLoading = true
        state.error = null
        state.success = false
      })
      .addCase(updateCourseAssistance.fulfilled, (state) => {
        state.assistanceLoading = false
        state.success = true
        state.error = null
      })
      .addCase(updateCourseAssistance.rejected, (state, action) => {
        state.assistanceLoading = false
        state.error = action.payload
        state.success = false
      })



      .addCase(deleteCourseAssistance.pending, (state) => {
        state.assistanceLoading = true
        state.error = null
      })
      .addCase(deleteCourseAssistance.fulfilled, (state) => {
        state.assistanceLoading = false
        state.error = null
      })
      .addCase(deleteCourseAssistance.rejected, (state, action) => {
        state.assistanceLoading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearSuccess } = assistanceWorkSlice.actions

export default assistanceWorkSlice.reducer