import { createSlice } from "@reduxjs/toolkit";

const user=createSlice({
    name:'user',
    initialState:{},
    reducers:{
        loginRequest:(state)=>{
            state.loading=true
            state.isAuthenticated=false
        },
        loginSucess:(state,action)=>{
            state.loading=false
            state.isAuthenticated=true
            state.user=action.payload
        },
        loginFail:(state,action)=>{
            
            state.loading=false
            state.isAuthenticated=false
            state.user=null
            state.error=action.payload
        },
        clearError:(state)=>{
            
            
            state.error=null
        },
        registerSuccess:(state,action)=>{
            state.loading=false
            state.isAuthenticated=true
            state.user=action.payload
        },
        registerFail:(state,action)=>{
            state.loading=false
            state.isAuthenticated=false
            state.user=null
        },
        loadUserSuccess:(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.isAuthenticated=true
        },
        loadUserFail:(state,action)=>{
            state.loading=false
            state.message=action.payload
        },
        logoutRequest:(state)=>{
            state.loading=true
        },
        logoutSuccess:(state)=>{
            state.user=null
            state.loading=false
            state.isAuthenticated=false
        },
        logoutFail:(state,action)=>{
            state.message=action.payload
        }
    }
})

const {actions,reducer}=user
export const {loginFail,loginRequest,loginSucess,clearError,registerSuccess,loadUserFail,loadUserSuccess,logoutFail,logoutRequest,logoutSuccess,registerFail}=actions
export default reducer