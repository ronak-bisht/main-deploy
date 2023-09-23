import axios from "axios"
import { createOrderFail, createOrderSuccess, getAdminOrderFail, getAdminOrderRequest, getAdminOrderSuccess, getMyOrdersFail, getMyOrdersRequest, getMyOrdersSuccess } from "../Reducers/orderReducer"

const createOrder=(obj)=>async (dispatch)=>{
    console.log(obj)
    try{
        // console.log('this is not error just my hello ullo')
        // const order="this"
        const order=await axios.post('http://localhost:4000/order/new',obj,{headers:{"Content-Type":"application/json"},withCredentials:true})
        // const order=await axios('http://localhost:4000/order/me')
        dispatch(createOrderSuccess(order))
    }catch(err){
        dispatch(createOrderFail(err.response.data.message))
    }
}

const getAllOrders=()=>async (dispatch)=>{
    try{
        dispatch(getMyOrdersRequest())
        const {data}= await axios('http://localhost:4000/orders/me',{withCredentials:true})
        dispatch(getMyOrdersSuccess(data.orders))
    }catch(err){
        console.log(err.response.data.message)
        dispatch(getMyOrdersFail(err.response.data.message))
    }
}

const getAdminOrderss=()=>async (dispatch)=>{
    try{
        dispatch(getAdminOrderRequest())
        const {data}= await axios('http://localhost:4000/admin/orders',{withCredentials:true})
        
        dispatch(getAdminOrderSuccess(data))
    }catch(err){
        dispatch(getAdminOrderFail(err.response.data.message))
    }
}

const deleteAdminOrders=(id)=>async (dispatch)=>{
    try{
        const {data}= await axios.delete(`http://localhost:4000/admin/order/${id}`,{withCredentials:true})
    }catch(err){
        console.log(err.response.data.message)
    }
}

export {createOrder,getAllOrders,getAdminOrderss,deleteAdminOrders}