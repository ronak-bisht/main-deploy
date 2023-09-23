import { useSelector } from "react-redux"
import CartCard from "../../Pages/cart/CartCard"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ConfirmOrder(){
    const {cartItems,shipping}=useSelector(state=>state.cart)
    const price=cartItems.reduce((acc,cur)=>acc+cur.price*cur.quantity,0)
    const navigate=useNavigate()
    useEffect(()=>{
        
        if(cartItems.length<1){
            return navigate('/cart')
        }
    },[])
    async function proceedPayment(){
        sessionStorage.setItem("orderInfo",JSON.stringify({price,shipping}))
        try{
            const {data:{order}}= await axios.post('http://localhost:4000/checkout',{price},{headers:{"Content-Type":"application/json"}})
            
            var options = {
              key: "rzp_test_fQdtsjqUN9gpM1", // Enter the Key ID generated from the Dashboard
              amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "Acme Corp",
              description: "Test Transaction",
              image: "https://example.com/your_logo",
              order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              callback_url: "http://localhost:4000/payment",
              prefill: {
                  "name": "Gaurav Kumar",
                  "email": "gaurav.kumar@example.com",
                  "contact": "9000090000"
              },
              notes: {
                  "address": "Razorpay Corporate Office"
              },
              theme: {
                  "color": "#3399cc"
              }
          };
           var rzp1 = new window.Razorpay(options);   
              rzp1.open();    
           }catch(err){
            console.log(err)
           }    
    }


    return(
        <>
            <div className="confirm-order">
                <div className="confirm-shipping">
                    <h2>{shipping.name}</h2>
                    <h2>{shipping.building}</h2>
                    <h2>{shipping.area}</h2>
                    <h2>{shipping.city}</h2>
                    <h2>{shipping.state}</h2>
                    <h2>{shipping.pincode}</h2>
                </div>
                <div className="confirm-cart">
                    {
                        cartItems.map(item=>{
                            return <CartCard item={item} />
                        })
                    }
                </div>
                <div className="procced-to-payment">
                    <button onClick={proceedPayment}>Procced to Payment</button>
                </div>
            </div>
        </>
    )
}