import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const cart=createSlice({
    name:'cart',
    initialState:{cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],shipping:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{}},
    reducers:{
        addItemToCart:(state,action)=>{
            const item=action.payload
            const isExist=state.cartItems.filter((i)=>{
                return item.product===i.product
            })
            if(isExist.length>0){
                state.cartItems=state.cartItems.map((i)=>{
                    return i.product===item.product?item:i
                })
            }else{
                state.cartItems.push(item)
            }
        },
        removeCartItem:(state,action)=>{
            state.cartItems=state.cartItems.filter((i)=>{
                return action.payload!=i.product
            })
        },
        shippingInfo:(state,action)=>{
            state.shipping=action.payload
        },
        clearCart:(state)=>{
            state.cartItems=[]
        }
    }
})

const {actions,reducer}=cart
export const {addItemToCart,removeCartItem,shippingInfo,clearCart}=actions
export default reducer