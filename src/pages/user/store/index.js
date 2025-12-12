import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = {
        PageNumber: params?.page || 1,
        RowsOfPage: params?.perPage || 10,
        SortingCol: params?.sort?.toUpperCase() || "DESC",
        SortType: params?.sortColumn || "InsertDate",
        Query: params?.q || "",
        IsActiveUser: true,
        IsDeletedUser: true,
      };

      if (params?.roleId !== undefined) {
        queryParams.roleId = params.roleId;
      }

      const res = await axios.get(
        "https://sepehracademy.liara.run/User/UserMannage",
        { params: queryParams }
      );

      return {
        data: res.data?.listUser || [],
        total: res.data?.totalCount || 0,
        params: queryParams,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (formData, { rejectWithValue }) => {
     
    try {
      console.log("Form Data being sent:", formData);
    
      const response = await axios.post(
        "https://sepehracademy.liara.run/User/CreateUser",
        formData
      );

      if (response.data?.success === false) {
        return rejectWithValue(response.data.message || "خطای ناشناخته");
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://sepehracademy.liara.run/User/UserDetails/${id}`
      );
      return response.data;
    } catch (error) {
      toast.error("ابتدا وارد سیستم شوید", {
        position: "top-center",
        autoClose: 4000,
        style: {
          backgroundColor: "#7367F0",
          color: "#fff",
          fontWeight: "500",
          fontSize: "18px",
          width: "300px",
          textAlign: "center",
        },
      });
      return rejectWithValue("ابتدا وارد سیستم شوید");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    total: 0,
    params: {},
    loading: false,
    error: null,
    addStatus: "idle",
    addError: null,
    selectedUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.params = action.payload.params;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedUser = null;
      })
      .addCase(addUser.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.data.push(action.meta.arg);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload;
      });
  },
});

export default usersSlice.reducer;
