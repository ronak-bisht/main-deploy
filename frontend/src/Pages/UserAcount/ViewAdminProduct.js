import { useDispatch } from "react-redux"
import { deleteProduct } from "../../Actions/productDetailAction"

export default function ViewAdminProduct({product,fun}){
    const dispatch=useDispatch()
    function handleDelete(id){
        console.log(id)
        dispatch(deleteProduct(id))
    }
    return(
        <>
            <div className="admin-products">
                        {
                            product && product.map((item)=>{
                                return (
                                    <>
                                        <div className="admin-product">
                                            <div className="image">
                                                <img src={`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${item.images[0].url}`} width={"150px"} />
                                            </div>
                                            <div>
                                                <h2>{item.price}</h2>
                                            </div>
                                            <div>
                                                {item.description}
                                            </div>
                                            <div>
                                                {item.stock}
                                            </div>
                                            <div>
                                                {item.category}
                                            </div>
                                            <div>
                                                <button name="update" onClick={(e)=>fun(e,item._id)}>edit</button>
                                            </div>
                                            <div>
                                                <button onClick={()=>handleDelete(item._id)}>delete</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
        </>
    )
}