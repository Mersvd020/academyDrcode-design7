import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://sepehracademy.liara.run/Building";

const getAuthToken = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      console.error("No userData found in localStorage");
      return null;
    }
    const parsed = JSON.parse(userData);
    return parsed?.token || null;
  } catch (error) {
    console.error("Error parsing userData:", error);
    return null;
  }
};

const getConfig = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const getBuildings = createAsyncThunk(
  "buildings/getBuildings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getConfig());
      console.log("Fetched buildings:", response.data);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در دریافت اطلاعات");
    }
  }
);

export const createBuilding = createAsyncThunk(
  "buildings/createBuilding",
  async (buildingData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, buildingData, getConfig());
      console.log("Created building:", response.data);
      await dispatch(getBuildings());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در ایجاد ساختمان");
    }
  }
);

export const updateBuilding = createAsyncThunk(
  "buildings/updateBuilding",
  async ({ id, buildingData }, { dispatch, rejectWithValue }) => {
    try {
      const dataToSend = {
        ...buildingData,
        id,
      };
      const response = await axios.put(API_URL, dataToSend, getConfig());
      console.log("Updated building:", response.data);
      await dispatch(getBuildings());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "خطا در بروزرسانی ساختمان"
      );
    }
  }
);

export const toggleBuildingStatus = createAsyncThunk(
  "buildings/toggleBuildingStatus",
  async ({ id, buildingData }, { dispatch, rejectWithValue }) => {
    try {
      const dataToSend = {
        ...buildingData,
        id,
        active: !buildingData.active,
      };
      const response = await axios.put(`${API_URL}/Active`, dataToSend, getConfig());
      console.log("Toggled building status:", response.data);
      await dispatch(getBuildings());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "خطا در تغییر وضعیت ساختمان"
      );
    }
  }
);

export const buildingsSlice = createSlice({
  name: "buildings",
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
      .addCase(getBuildings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBuildings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getBuildings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createBuilding.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBuilding.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createBuilding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updateBuilding.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBuilding.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateBuilding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(toggleBuildingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBuildingStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleBuildingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = buildingsSlice.actions;

export default buildingsSlice.reducer;
