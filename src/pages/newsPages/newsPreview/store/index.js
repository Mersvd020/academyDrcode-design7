// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getData = createAsyncThunk("appNews/getData", async (params) => {
  const response = await axios.get(
    "https://sepehracademy.liara.run/News/AdminNewsFilterList",
    {
      params: {
        PageNumber: params?.page || 1,
        RowsOfPage: params?.perPage || 1000,
        SortingCol: params?.sortingCol || "DESC",
        Query: params?.q || "",
        ...params,
      },
    }
  );

  return {
    params,
    data: response.data.news || [],
    allData: response.data.news || [],
    totalPages: response.data.totalCount || 0,
  };
});

export const updateNews = createAsyncThunk(
  "appNews/updateNews",
  async (newsData, { dispatch, getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      const fields = [
        "Id",
        "SlideNumber",
        "CurrentImageAddress",
        "CurrentImageAddressTumb",
        "Active",
        "Title",
        "GoogleTitle",
        "GoogleDescribe",
        "MiniDescribe",
        "Describe",
        "Keyword",
        "IsSlider",
        "NewsCatregoryId",
        "Image",
      ];

      fields.forEach((key) => {
        if (
          newsData[key] !== null &&
          newsData[key] !== undefined &&
          newsData[key] !== ""
        ) {
          formData.append(key, newsData[key]);
          console.log(`FormData: ${key} = ${newsData[key]}`);
        }
      });
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://sepehracademy.liara.run/News/UpdateNews",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      await dispatch(getData(getState().newsPreview.params));

      return response.data;
    } catch (error) {
      console.error("api error:", error);
      console.error("error response:", error.response?.data);
      console.error("error status:", error.response?.status);

      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export const appNewsSlice = createSlice({
  name: "appNews",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.allData = action.payload.allData;
        state.total = action.payload.totalPages;
        state.params = action.payload.params;
        state.loading = false;
      })
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appNewsSlice.reducer;
