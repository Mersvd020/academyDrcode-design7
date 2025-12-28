import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated : false
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        loginSuccess(state,action){
           state.user = {
            phoneNumber:action.payload.phoneNumber,
            id:action.payload.id,
            role:action.payload.role || []
           };
           state.token = action.payload.token;
           state.isAuthenticated = true;
        },
        logout(state){
            state.user = null;
            state.token  = null;
            state.isAuthenticated = false
            localStorage.removeItem('token');
            localStorage.removeItem('persist:root');
        }
    }
})

export const {loginSuccess,logout} =authSlice.actions;
export default authSlice.reducer;