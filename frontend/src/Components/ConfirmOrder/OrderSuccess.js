import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../Actions/orderAction"
import { useParams } from "react-router-dom"
import { clearCartItems } from "../../Actions/cartAction"

export default function OrderSuccess(){
    const {id}=useParams()
    const {cartItems}=useSelector(state=>state.cart)
   const {price,shipping}=JSON.parse(sessionStorage.getItem("orderInfo"))
   const dispatch=useDispatch()
   
   const obj={
    itemPrice:price,
    taxPrice:0,
    shippingPrice:0,
    totalPrice:price,
    orderItems:cartItems,
    shippingInfo:{
      address:shipping.building,
      city:shipping.area,
      state:shipping.city,
      country:"India",
      pinCode:shipping.pincode,
      phoneNo:12345
    },
    paymentInfo:{
      id,
      status:"secceeded"
    }
  }
   useEffect(()=>{
    console.log('hello')
    dispatch(createOrder(obj))
    dispatch(clearCartItems())
   },[])
   console.log('hello')
    return(
        <>
            <h1>{id}</h1>
        </>
    )
}