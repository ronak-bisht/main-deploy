import axios from "axios"
import { loadUserFail, loadUserSuccess, loginFail, loginRequest, loginSucess, logoutRequest, logoutSuccess, registerSuccess, logoutFail, registerFail,clearError } from "../Reducers/UserReducer"

const login=(email,password)=>async (dispatch)=>{
   
    try{
        dispatch(loginRequest())
        const {data}=await axios.post("http://localhost:4000/backend/login",{email,password},{withCredentials:true},{headers:{"Content-type":"application/json"}})
        dispatch(loginSucess(data))
    }catch(err){
        dispatch(loginFail(err.response.data.message))
    }
}

const register=(name,email,password)=>async (dispatch)=>{
    try{
        const {data}=await axios.post("http://localhost:4000/register",{name,email,password},{withCredentials:true},{headers:{"Content-type":"application/json"}})
        dispatch(registerSuccess(data))
    }catch(err){
        dispatch(registerFail(err.message))
    }
}
const loadUser=()=>async(dispatch)=>{
    try{
        const {data}=await axios("http://localhost:4000/me",{withCredentials:true})
        dispatch(loadUserSuccess(data))
    }catch(err){
        dispatch(loadUserFail(err.message))
    }
}

const logout=()=>async(dispatch)=>{
    try{
        dispatch(logoutRequest())
        const {data}=await axios('http://localhost:4000/logout',{withCredentials:true})
        dispatch(logoutSuccess())
    }catch(err){
        dispatch(logoutFail(err.response.data.message))
    }
}
const clearErrors=()=>async(dispatch)=>{
    console.log('inside clear error action ')
    dispatch(clearError())
}

export {login,register,loadUser,logout,clearErrors}