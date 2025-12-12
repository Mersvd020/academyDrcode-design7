// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Login Action
export const handleLogin = createAsyncThunk(
  'authentication/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://sepehracademy.liara.run/Sign/Login',
        {
          phoneOrGmail: userData.phoneOrGmail,
          password: userData.password,
          rememberMe: userData.rememberMe || false
        }
      )

      const data = response.data

      
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userData', JSON.stringify(data))
        
       
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      }

      return data
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.ErrorMessage || 'خطا در ورود به سیستم'
      return rejectWithValue(message)
    }
  }
)


export const handleLogout = createAsyncThunk(
  'authentication/logout',
  async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    delete axios.defaults.headers.common['Authorization']
    return null
  }
)

const getUserData = () => {
  const item = localStorage.getItem('userData')
  return item ? JSON.parse(item) : null
}

const initialUser = getUserData()


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser,
    isAuthenticated: !!initialUser,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(handleLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Logout Cases
      .addCase(handleLogout.fulfilled, (state) => {
        state.userData = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
      })
  }
})

export const { clearError } = authSlice.actions

export default authSlice.reducer