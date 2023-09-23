import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../../Actions/productAction"
import ViewAdminProduct from "./ViewAdminProduct"
import CreateProduct from "./CreateProduct"
import Update from "./Update"
import AdmminOrder from "./AdminOrder"

export default function AdminDashboard(){
    const [selected,setSelected]=useState({product:true})
    const [id,setId]=useState("")
    
    function handleSelect(e,id){
       setId(id)
        const {name}=e.target
        setSelected(()=>{
            return {
                [name]:true
            }
        })
    }
    console.log(selected)
    const dispatch=useDispatch()
    const {product,loading}=useSelector(state=>state.products)
    console.log(product)
    useEffect(()=>{
        dispatch(getProduct())
    },[])
    
        return(
            <>
           
                <div className="dashboard-container">

                    <div className="side-bar">
                        <button onClick={handleSelect} name="product">Products</button>
                        <button onClick={handleSelect} name="create">Create Product</button>
                        <button onClick={handleSelect} name="order">Order Management</button>
                        <button onClick={handleSelect} name="user">User Management</button>
                        
                        <button>Dashbooard</button>
                    </div>


                    <div className="admin-main-container">
                    { selected.product && (
                        loading?(
                            <h1>loading</h1>
                            ):(
                                product && <ViewAdminProduct product={product} fun={(e,id)=>handleSelect(e,id)}/>
                                 )
                    )
                
                    }

                    {selected.create && <CreateProduct />}
                    {selected.update && <Update id={id}/>}
                    {selected.order && <AdmminOrder />}
                    
                    </div>

                   

                </div>
            </>
        )
    
}