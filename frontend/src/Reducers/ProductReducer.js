import { createSlice } from "@reduxjs/toolkit";

const product=createSlice({
    name:"products",
    initialState:{},
    reducers:{
        productRequest:(state)=>{
            state.loading=true
        },
        productSuccess:(state,action)=>{
            state.loading=false
            state.product=action.payload
        },
        productFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        clearError:(state,action)=>{
            state={
                ...state,
                error:null
            }
        },
    }
})

const{actions,reducer}=product
export const {productRequest,productFail,productSuccess,clearError}=actions
export default reducer