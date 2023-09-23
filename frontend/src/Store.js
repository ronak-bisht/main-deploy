import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Reducers/ProductReducer";
import productDetailReducer from "./Reducers/ProductDetailReducer"
import cartReducer from "./Reducers/CartReducer"
import userReducer from "./Reducers/UserReducer"
import orderReducer from "./Reducers/orderReducer"
const store=configureStore({
    reducer:{
        products:productReducer,
        productDetail:productDetailReducer,
        cart:cartReducer,
        user:userReducer,
        order:orderReducer

    }
})

export default store