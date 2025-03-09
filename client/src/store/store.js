import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/authSlice'
import adminProductsSliceReducer from './admin/product-slice/productSlice'
import shopProductsSliceReducer from './shop/products-slice/productSlice'




const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSliceReducer,
        shopProducts : shopProductsSliceReducer
    }
})


export default store;