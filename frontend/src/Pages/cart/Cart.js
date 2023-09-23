import { useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import CartCard from "./CartCard";

export default function Cart(){

    const {cartItems}=useSelector(state=>state.cart)
    console.log(cartItems)
    const navigate=useNavigate()
    const total=cartItems.reduce((acc,curr)=>acc+(curr.quantity*curr.price),0)
    function handleCheckout(){
        console.log('redirect')
        navigate('/login?redirect=shipping')
    }
    return(
        <>
            <div className="cart-section">
                <div className="heading">
                    <h1>Your cart</h1>
                    <Link><p>continue shopping</p></Link>
                </div>
                <div className="title">
                    <p className="cart-product">PRODUCT</p>
                    <p className="cart-quantity">QUANTITY</p>
                    <p className="cart-total">TOTAL</p>
                </div>
                <div className="cart-items">
                    {
                        cartItems.length>0?(
                            <>
                            {
                                cartItems.map((item)=>{
                                    return <CartCard item={item}/>
                                })
                            }
                               
                            </>
                        ):(
                            <>
                                <h1>no items</h1>
                            </>
                        )
                    }
                </div>

                <div className="subtotal">
                    subtotal rs {total}
                </div>
                <div className="checkout-btn">
                    <button onClick={handleCheckout}>checkout</button>
                </div>
            </div>
        </>
    )
}