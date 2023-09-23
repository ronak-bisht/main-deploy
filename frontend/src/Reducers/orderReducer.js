const { createSlice } = require("@reduxjs/toolkit");

const orderReucer=createSlice({
    initialState:{},
    name:"order",
    reducers:{
        createOrderSuccess:(state,action)=>{
            // state.order=action.payload
        },
        createOrderFail:(state,action)=>{
            state.message=action.payload
        },
        getMyOrdersRequest:(state)=>{
            state.loading=true
        },
        getMyOrdersSuccess:(state,action)=>{
            state.loading=false
            state.order=action.payload
        },
        getMyOrdersFail:(state,action)=>{
            state.loading=false
            state.message=action.payload
        },
        getAdminOrderRequest:(state,action)=>{
            state.loading=true
            
        },
        getAdminOrderSuccess:(state,action)=>{
           
            state.loading=false
            state.orders=action.payload
        },
        getAdminOrderFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

const {reducer,actions}=orderReucer
export const {createOrderFail,createOrderSuccess,getMyOrdersRequest,getMyOrdersFail,getMyOrdersSuccess,getAdminOrderFail,getAdminOrderRequest,getAdminOrderSuccess}=actions
export default reducer