import { useDispatch, useSelector } from "react-redux"
import { useLoaderData, useParams } from "react-router-dom"
import { getProductDetail } from "../../Actions/productDetailAction"
import { useEffect, useState } from "react"
import { addToCart } from "../../Actions/cartAction"
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetail(){
    console.log('product detail')
    const [quantity,setQuantity]=useState(1)
    const [size,setSize]=useState("")
    const {id}=useParams()
    const {loading,product}=useSelector(state=>state.productDetail)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getProductDetail(id))
 },[])

 function handleQuntity(e){
    if(e.target.name=='decrement'){
        if(quantity>1){
            setQuantity(pre=>pre-1)
            
        }
        
    }
    else if(e.target.name=='increment'){
        if(quantity<10){
            setQuantity(pre=>pre+1)
        }
    }
 }
 
 function handleCart(){
    if(size==""){
        toast.error("Please select the size",{
            position:"top-center"
        })
        return
    }
    dispatch(addToCart(quantity,id,size))
    toast.success('Item added to cart',{
        position:"top-center"
    })
 }
 function handleSize(e){
    const {name}=e.target
    setSize(name)
 }
    return(
        
        <>
        
            {
                loading?(
                    <h2>loading</h2>
                ):(
                    product &&  <div className="product-detail">
                    <div className="product-detail-img">
                        <div className="one"><img src={`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${product.product.images[0].url}`}/></div>
                        <div className="two"><img src={`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${product.product.images[1].url}`}/></div>
                        <div className="three"><img src={`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${product.product.images[2].url}`}/></div>
                    </div>
                    <div className="product-detail-info">
                        <div className="heading"><h2>{product.product.name}</h2></div>
                        <div className="price"><p>Rs. {product.product.price}.00</p></div>
                        <div className="sizes">
                            <p>sizes</p>
                            <button className={product.product.sizes[0].stock>0?"enable":"disable-btn"} name="S" onClick={handleSize}>S</button>
                            <button className={product.product.sizes[1].stock>0?"enable":"disable-btn"} name="M" onClick={handleSize}>M</button>
                            <button className={product.product.sizes[2].stock>0?"enable":"disable-btn"} name="L" onClick={handleSize}>L</button>
                            <button className={product.product.sizes[2].stock>0?"enable":"disable-btn"} name="XL" onClick={handleSize}>XL</button>
                        </div>
                        <div className="quantity-container">
                            <p>quanity</p>
                        <div className="quantity">
                             <button name='decrement' onClick={(e)=>handleQuntity(e)}>-</button>
                             <h3>{quantity}</h3>
                             <button name='increment' onClick={(e)=>handleQuntity(e)}>+</button>
                        </div>
                        </div>
                        <div className="add-cart">
                            <button onClick={handleCart}>Add to cart</button>
                        </div>
                        <div className="description">
    
                        </div>
                        <ToastContainer />
                    </div>
                </div>
                )
            }
           
          
        </>
    )
}