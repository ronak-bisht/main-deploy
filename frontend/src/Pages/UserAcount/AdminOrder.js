import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteAdminOrders, getAdminOrderss } from "../../Actions/orderAction"
import { ToastContainer, toast } from 'react-toastify';
export default function AdmminOrder(){
    const {loading, orders}=useSelector(state=>state.order)

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAdminOrderss())
    },[])

   function handleDelete(id){
     dispatch(deleteAdminOrders(id))
     toast.success("Order deleted successfully",{
        position:"top-center"
     })
   }
    return(
        <>
            {
                loading?(
                    <h1>loading ...</h1>
                ):(
                    orders && <div>
                        {
                            orders.orders.map((item)=>{
                                return (
                                    <div className="admin-order-item">
                                        <h3>{item._id}</h3>
                                        <h3>{item.totalPrice}</h3>
                                        <h3>{item.orderStatus}</h3>
                                        <button>edit</button>
                                        <button onClick={()=>handleDelete(item._id)}>delete</button>
                                    </div>
                                )
                            })
                        }
                        <ToastContainer />
                    </div>
                )
            }
        </>
    )
}