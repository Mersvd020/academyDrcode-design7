import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'https://sepehracademy.liara.run'
const API_URL = `${BASE_URL}/SharePanel`

const getAuthToken = () => {
  try {
    const userData = localStorage.getItem('userData')
    if (!userData) return null
    const parsed = JSON.parse(userData)
    return parsed?.token || null
  } catch (error) {
    return null
  }
}

const getConfig = () => ({
  headers: {
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  }
})

export const getProfileInfo = createAsyncThunk(
  'profile/getProfileInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetProfileInfo`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت اطلاعات')
    }
  }
)

export const updateProfileInfo = createAsyncThunk(
  'profile/updateProfileInfo',
  async (profileData, { dispatch, rejectWithValue }) => {
     const formData = new FormData();
    formData.append("FName", profileData.fName);
    formData.append("LName", profileData.lName);
    formData.append("UserAbout", profileData.userAbout);
    formData.append("PhoneNumber",profileData.phoneNumber);
    formData.append("NationalCode", profileData.nationalCode);
    formData.append("HomeAdderess", profileData.homeAdderess);
    formData.append("Email", profileData.email);
    formData.append("Gender", profileData.gender);
     formData.append("BirthDay", profileData.birthDay);

    try {
      console.log('Updating profile with data:', profileData)
      
        const response = await axios.put(`${API_URL}/UpdateProfileInfo`, formData,{

          headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
          }
        })
        console.log(' PUT successfu:', response.data)
        await dispatch(getProfileInfo())
        return response.data



         console.log(' PUT failed, trying POST...')
      
        // const response = await axios.post(`${API_URL}/UpdateProfileInfo`, profileData, getConfig())
        // console.log(' POST successful:', response.data)
        // await dispatch(getProfileInfo())
        // return response.data
     }catch (error) {
      console.error(' Update failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
      return rejectWithValue(error.response?.data || 'خطا در بروزرسانی پروفایل')
    }
  }
)

export const addProfileImage = createAsyncThunk(
  'profile/addProfileImage',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/AddProfileImage`, formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      await dispatch(getProfileInfo())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در آپلود تصویر')
    }
  }
)

export const selectProfileImage = createAsyncThunk(
  'profile/selectProfileImage',
  async (imageId, { dispatch, rejectWithValue }) => {
      const formDataa = new FormData();
      formDataa.append("ImageId",imageId);
    try {
      const response = await axios.post(`${API_URL}/SelectProfileImage`,formDataa,{
          headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      await dispatch(getProfileInfo())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در انتخاب تصویر')
    }
  }
)

export const deleteProfileImage = createAsyncThunk(
  'profile/deleteProfileImage',
  async (imageId, { dispatch, rejectWithValue }) => {
    const formDatta = new FormData();
      formDatta.append("DeleteEntityId",imageId)
    try {
      const response = await axios.delete(`${API_URL}/DeleteProfileImage`,
        {
          data:formDatta,
         headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      await dispatch(getProfileInfo())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در حذف تصویر')
    }
  }
)

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/ChangePassword`, {
        oldPassword,
        newPassword
      }, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در تغییر رمز عبور')
    }
  }
)

export const getSecurityInfo = createAsyncThunk(
  'profile/getSecurityInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetSecurityInfo`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت اطلاعات امنیتی')
    }
  }
)

export const editSecurity = createAsyncThunk(
  'profile/editSecurity',
  async (securityData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/EditSecurity`, securityData, getConfig())
      await dispatch(getSecurityInfo())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در بروزرسانی امنیت')
    }
  }
)

export const changeRecovery = createAsyncThunk(
  'profile/changeRecovery',
  async (sendValue, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/ChangeRecovery/${sendValue}`, {}, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در تغییر ایمیل بازیابی')
    }
  }
)

export const getMyFavoriteCourses = createAsyncThunk(
  'profile/getMyFavoriteCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetMyFavoriteCourses`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت دوره‌های علاقه‌مندی')
    }
  }
)

export const getMyFavoriteNews = createAsyncThunk(
  'profile/getMyFavoriteNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetMyFavoriteNews`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت اخبار علاقه‌مندی')
    }
  }
)

export const getMyCoursesComments = createAsyncThunk(
  'profile/getMyCoursesComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetMyCoursesComments`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت نظرات دوره‌ها')
    }
  }
)

export const getMyNewsComments = createAsyncThunk(
  'profile/getMyNewsComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetMyNewsComments`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت نظرات اخبار')
    }
  }
)

export const getMyCoursesReserve = createAsyncThunk(
  'profile/getMyCoursesReserve',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/GetMyCoursesReserve`, getConfig())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'خطا در دریافت دوره‌های رزرو شده')
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileInfo: null,
    securityInfo: null,
    favoriteCourses: [],
    favoriteNews: [],
    coursesComments: [],
    newsComments: [],
    coursesReserve: [],
    loading: false,
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
      .addCase(getProfileInfo.pending, (state) => {
        state.loading = true
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.loading = false
        state.profileInfo = action.payload
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateProfileInfo.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(updateProfileInfo.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(updateProfileInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(getSecurityInfo.fulfilled, (state, action) => {
        state.securityInfo = action.payload
      })
      .addCase(getMyFavoriteCourses.fulfilled, (state, action) => {
        state.favoriteCourses = action.payload
      })

      .addCase(getMyFavoriteNews.fulfilled, (state, action) => {
        state.favoriteNews = action.payload
      })

      .addCase(getMyCoursesComments.fulfilled, (state, action) => {
        state.coursesComments = action.payload
      })

      .addCase(getMyNewsComments.fulfilled, (state, action) => {
        state.newsComments = action.payload
      })

      .addCase(getMyCoursesReserve.fulfilled, (state, action) => {
        state.coursesReserve = action.payload
      })
  }
})

export const { clearError, clearSuccess } = profileSlice.actions
export default profileSlice.reducer