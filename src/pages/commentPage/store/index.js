// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import { User } from "react-feather";

export const getCommentData = createAsyncThunk(
  "appCourse/getCommentData",
  async (params) => {
    const response = await axios.get(
      "https://sepehracademy.liara.run/Course/CommentManagment",
      {
        params: {
          PageNumber: 1, /// اینجا باگ داره
          RowsOfPage: 1000,
          SortingCol: params?.sortingCol || "DESC",
          SortType: params?.sortType || "InsertDate",
          // Accepted: params?.accepted || null,
          // TeacherId: params?.teacherId || null,
          // UserId : params?.userId || null,

          // Query: params?.q || '',
          ...params,
        },
      }
    );

    console.log(response.data);

    return {
      params,
      data: response.data.comments || [],
      allData: response.data.comments || [],
      totalPages: response.data.totalCount || 0,
    };
  }
);

export const deleteComment = createAsyncThunk(
  "appCourse/deleteComment",
  async (Id, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    console.log("Payload:", Id);

    try {
      const response = await axios.delete(
        `https://sepehracademy.liara.run/Course/DeleteCourseComment?CourseCommandId=${Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("deleteWork", response.data);

      await dispatch(getCommentData(getState().course.params));

      return { Id, activing };
    } catch (error) {
      console.log("Error details:", error.response?.data);
      console.log("Error status:", error.response?.status);
      throw error;
    }
  }
);

export const activeComment = createAsyncThunk(
  "appCourse/activeComment",
  async (Id, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    console.log("dataComing:", Id);

    try {
      const response = await axios.post(
        `https://sepehracademy.liara.run/Course/AcceptCourseComment?CommentCourseId=${Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("activeWork", response.data);

      await dispatch(getCommentData(getState().course.params));

      return { Id, activing };
    } catch (error) {
      console.log("Error details:", error.response?.data);
      console.log("Error status:", error.response?.status);
      throw error;
    }
  }
);


export const appCourseSlice = createSlice({
  name: "appCourse",
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.allData = action.payload.allData;
        state.total = action.payload.totalPages;
        state.params = action.payload.params;
        state.loading = false;
      })
      .addCase(getCommentData.pending, (state) => {
        state.loading = true;
      });
   
  },
});

export default appCourseSlice.reducer;
