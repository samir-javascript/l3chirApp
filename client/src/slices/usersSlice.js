/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("restaurant_users") ? JSON.parse(localStorage.getItem('restaurant_users')) : null,
}
     
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state,action)=> {
            state.userInfo = action.payload;
            localStorage.setItem('restaurant_users', JSON.stringify(action.payload))
        },
        logOutUser: (state,action)=> {
            state.userInfo = null;
            localStorage.removeItem("restaurant_users")
        },
        
       
    }
})
export const {
     setCredentials,
     logOutUser
} = authSlice.actions;
export default authSlice.reducer;
