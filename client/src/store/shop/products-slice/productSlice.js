import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts' , async ({filterParams, sortParams})=>{
    //create queryparams
    const query = new URLSearchParams({ ...filterParams, sortBy : sortParams})

    const response = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`)

    return response?.data
})

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails' , async (id)=>{
    
    const response = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)
    return response?.data

})

const shopProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading = true;
            
        })
        .addCase(fetchAllFilteredProducts.fulfilled,(state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.productList = action.payload.data;
        })
        .addCase(fetchAllFilteredProducts.rejected,(state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.productList = [];
        })
        .addCase(fetchProductDetails.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled,(state, action)=>{
            console.log(action.payload)
            state.isLoading = false;
            state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected,(state)=>{
            state.isLoading = false;
            state.productDetails = null;
        })
    }
})

export default shopProductsSlice.reducer; 