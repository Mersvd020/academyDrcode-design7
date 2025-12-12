// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

export const getTimeList = createAsyncThunk(
  "timeList/getTimeList",
  async (params) => {
    const token = localStorage.getItem("token");
    const response = await axios.get("https://sepehracademy.liara.run/Term", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('timelist:', response.data)

    return {
      data: response.data,
      allData: response.data,
      total: response.data.length,
    };
  }
);

export const timeListSlice = createSlice({
  name: "timeList",
  initialState: {
    data: [],
    allData: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeList.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.allData = action.payload.allData;
      state.total = action.payload.total;
      console.log("Data loaded:", action.payload);
    });
  },
});

export default timeListSlice.reducer;
