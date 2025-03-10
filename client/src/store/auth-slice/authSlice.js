import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user : null
}

//puthiya tharam middleware (redux-thunk)
export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData ,{ withCredentials : true })
    return response.data
})

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData ,{ withCredentials : true })
    return response.data
})

export const checkAuth = createAsyncThunk('/auth/check-auth', async () => {
    const response = await axios.get('http://localhost:5000/api/auth/check-auth',{ 
        withCredentials : true,
        headers : {
            'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate',
        }
    })
    return response.data
})

export const logoutUser = createAsyncThunk('/auth/logout', async ()=>{  
    const response = await axios.post('http://localhost:5000/api/auth/logout', {},{ withCredentials : true }) //empty {} formData nte aan tto... marakkarudhh kodukkan. if didn't give that , still token not get cleared !!
    console.log(response)
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setUser : (state,action) => {}
    },
    extraReducers : (builder)=> {
        builder
        .addCase(registerUser.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state,action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state,action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state,action)=> {
            // console.log(action) //similar to register/login - dipatchil kituunn response data 
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null; //compalsory aan ee ternary condition !!
            state.isAuthenticated = action.payload.success;
        })
        .addCase(loginUser.rejected, (state,action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(checkAuth.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state,action)=> {
            // console.log(action) //similar to register/login - dipatchil kituunn response data 
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null; //compalsory aan ee ternary condition !!
            state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state,action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logoutUser.fulfilled, (state)=> { 
            state.isLoading = false;   // similar to loginUser.reject concept
            state.user = null; 
            state.isAuthenticated = false;
        })
    }
}) 

export const {setUser} = authSlice.actions;
export default authSlice.reducer;