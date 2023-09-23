import { createSlice } from "@reduxjs/toolkit";

const detail=createSlice({
    name:"ProductDetail",
    initialState:{},
    reducers:{
        productDetailRequest:(state)=>{
            state.loading=true
        },
        productDetailSuccess:(state,action)=>{
            state.loading=false
            state.product=action.payload
        },
        productDetailFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        clearError:(state,action)=>{
            state={
                ...state,
                error:null
            }
        },
        deleteProductRequest:(state)=>{
            state.loading=true
        },
        deleteProduct:(state,action)=>{
            state={
                ...state,
                message:"deleted Succesfull",
                loading:'false'
            }
        }
    }
})

const {reducer,actions}=detail
export const {productDetailFail,productDetailRequest,productDetailSuccess,deleteProduct,deleteProductRequest}=actions
export default reducer