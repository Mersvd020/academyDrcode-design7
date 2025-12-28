import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    darkMode : false

}

const darkmode = createSlice({
    name:"darkmode",
    initialState,
    reducers:{
         darkBt(state){
            state.darkMode = !state.darkMode;
        } 
    }
})

export const {darkBt} = darkmode.actions;
export default darkmode.reducer;