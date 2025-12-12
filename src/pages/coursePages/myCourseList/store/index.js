// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getMyData = createAsyncThunk(
  "appCourse/getMyData",
  async (params) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://sepehracademy.liara.run/SharePanel/GetMyCourses",
      {
        params: {
          PageNumber: 1, /// اینجا باگ داره
          RowsOfPage: 1000,
          SortingCol: "DESC",
          SortType: "LastUpdate",
          Query: "",
          ...params,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.listOfMyCourses);

    return {
      params,
      data: response.data.listOfMyCourses || [],
      allData: response.data.listOfMyCourses || [],
      totalPages: response.data.listOfMyCourses || 0,
    };
  }
);

export const appCourseSlice = createSlice({
  name: "appCourse",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.allData = action.payload.allData;
      state.total = action.payload.totalPages;
      state.params = action.payload.params;
    });
  },
});

export default appCourseSlice.reducer;
