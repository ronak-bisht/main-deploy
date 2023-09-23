import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { shipping as shippingInfo } from "../../Actions/cartAction"
import { redirect, useNavigate } from "react-router-dom"
export default function Shipping(){
    const cart=useSelector(state=>state.cart)
    const [shipping,setShipping]=useState({name:cart.shipping.name,building:'',area:'',city:'',state:'',pincode:''})
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function handleChange(e){
        const {name,value}=e.target
        setShipping(pre=>{
            return {
                ...pre,
                [name]:value
            }
        })
    }
    
        useEffect(()=>{ 
            if(cart.cartItems.length<1){
                return navigate('/cart')
            }
        },[])

    console.log(shipping)
    function handleSubmit(e){
        e.preventDefault()
        dispatch(shippingInfo(shipping))
        navigate('/confirm')
    }
    return(
        <>
         <div className="shipping-container">
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit} className="shipping-form">
            <input type='text' placeholder="Full Name" name="name" value={shipping.name} onChange={handleChange} required/>
            <input type='text' placeholder="Building no." name="building" value={shipping.building} onChange={handleChange} required/>
            <input type='text' placeholder="Locality" name="area" value={shipping.area} onChange={handleChange} required/>
            <input type='text' placeholder="City" name="city" value={shipping.city} onChange={handleChange} required/>
            <input type='text' placeholder="State" name="state" value={shipping.state} onChange={handleChange} required/>
            <input type='text' placeholder="Pincode" name="pincode" value={shipping.pincode} onChange={handleChange} required/>
            <input type="submit" value='submit' className="submit"/>
            </form>
            
         </div>
        </>
    )
}