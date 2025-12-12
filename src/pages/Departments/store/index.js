// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// ** Axios Imports
import axios from "axios";

const API_URL = "https://sepehracademy.liara.run/Department";

const getAuthToken = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      console.error("No userData found in localStorage");
      return null;
    }
    const parsed = JSON.parse(userData);
    console.log("Auth token:", parsed?.token ? "Found" : "Missing");
    return parsed?.token || null;
  } catch (error) {
    console.error("Error parsing userData:", error);
    return null;
  }
};

const getConfig = () => {
  const token = getAuthToken();
  if (!token) {
    console.error("WARNING: No auth token available!");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getConfig());
      console.log("Fetched departments:", response.data);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در دریافت اطلاعات");
    }
  }
);

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (departmentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, departmentData, getConfig());
      console.log("Created department:", response.data);
      await dispatch(getDepartments());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در ایجاد دپارتمان");
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({ id, departmentData }, { dispatch, rejectWithValue }) => {
    try {
      console.log("Updating department ID:", id);
      console.log("Update data:", departmentData);

      const response = await axios.post(
        API_URL,
        { ...departmentData, id },
        getConfig()
      );
      console.log("Update successful:", response.data);
      await dispatch(getDepartments());
      return response.data;
    } catch (error) {
      console.error(" Update failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(
        error.response?.data || "خطا در بروزرسانی دپارتمان"
      );
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getConfig());
      console.log("Deleted department:", id);
      await dispatch(getDepartments());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در حذف دپارتمان");
    }
  }
);

export const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDepartment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDepartment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = departmentsSlice.actions;

export default departmentsSlice.reducer;
