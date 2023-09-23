import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../Actions/orderAction"

export default function MyOrders(){
    const dispatch=useDispatch()
    const {loading,order}=useSelector(state=>state.order)
    useEffect(()=>{
        console.log('inside useeefeectt')
        dispatch(getAllOrders())
    },[])

    // order && console.log(order[3].orderItems.map(item=>item.quantity))
    
    return(
        <>
            {
                loading?(
                    <div>
                        <h1>loading .....</h1>
                    </div>
                ):(
                   order && <div>
                    <h2>shipping info</h2>
                        {
                            order.map((item)=>{
                                return (
                                    <>
                                     <div className="order-container">
                                        <div className="shipping">
                                            
                                            <h3>{item.shippingInfo.address}</h3>
                                            <h3>{item.shippingInfo.city}</h3>
                                            <h3>{item.shippingInfo.state}</h3>
                                            <h2>status - {item.orderStatus}</h2>
                                        </div>
                                        <div className="order-items" >
                                            {
                                                item.orderItems.map((orderItem)=>{
                                                    return (
                                                        <>
                                                            <div className="order-item">
                                                                <img src={orderItem.image} width="100px"/>
                                                                <h2>name - {orderItem.name}</h2>
                                                                <h2>price - {orderItem.price}</h2>
                                                                <h2>size - {orderItem.size}</h2>
                                                                <h2>quantity - {orderItem.quantity}</h2>
                                                                
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                     </div>
                                    </>
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}