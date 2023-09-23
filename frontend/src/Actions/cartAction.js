import axios from "axios";
import { addItemToCart,clearCart,removeCartItem, shippingInfo } from "../Reducers/CartReducer";

const addToCart=(quantity,id,size)=>async(dispatch,getState)=>{
    try{
        const {data}=await axios(`http://localhost:4000/product/${id}`)
        const obj={
            name:data.product.name,
            price:data.product.price,
            quantity,
            rating:0,
            size,
            image:`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${data.product.images[0].url}`,
            product:data.product._id
        }
        dispatch(addItemToCart(obj))
    }catch(err){
        console.log(err)
        return
    }
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

const removeCart=(id)=>async (dispatch,getState)=>{
    dispatch(removeCartItem(id))
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

const shipping=(obj)=>async(dispatch,getState)=>{
    dispatch(shippingInfo(obj))
    localStorage.setItem('shippingInfo',JSON.stringify(getState().cart.shipping))
}
const clearCartItems=()=>async(dispatch)=>{
    dispatch(clearCart())
    localStorage.removeItem('cartItems')
}
export {addToCart,removeCart,shipping,clearCartItems}