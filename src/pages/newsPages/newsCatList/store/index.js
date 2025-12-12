// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getCatNewsList = createAsyncThunk(
  "catNewsList/getCatNewsList",
  async (params) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://sepehracademy.liara.run/News/GetListNewsCategory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("newsCat:", response.data);

    return {
      data: response.data,
      allData: response.data,
      total: response.data.length,
    };
  }
);

export const catNewsListSlice = createSlice({
  name: "catNewsList",
  initialState: {
    data: [],
    allData: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatNewsList.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.allData = action.payload.allData;
      state.total = action.payload.total;
      console.log("Data loaded:", action.payload);
    });
  },
});

export default catNewsListSlice.reducer;
