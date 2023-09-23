import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart, removeCart } from "../../Actions/cartAction"

export default function CartCard({item}){
    const [quantity,setQuantity]=useState(item.quantity)
    const dispatch=useDispatch()
    function handleQuntity(e){
        if(e.target.name=='decrement'){
            if(quantity>1){
                dispatch(addToCart(quantity-1,item.product))
                setQuantity(pre=>pre-1)
                
            }  

        }
        else if(e.target.name=='increment'){
            if(quantity<10){
                dispatch(addToCart(quantity+1,item.product))
                setQuantity(pre=>pre+1)
            }
        }
    }
    function handleDelete(){
        dispatch(removeCart(item.product))
    }
    return(
        <>
            <div className="cart-item">
                <div className="img-info">
                <div className="img">
                    <img src={item.image} width='100px'/>
                </div>
                <div className="info">
                    <p>{item.name}</p>
                    <p>Rs. {item.price}.00</p>
                    <p>S</p>
                </div>
                </div>
                <div className="cart-quantity">
                <div className="quantity">
                         <button name='decrement' onClick={(e)=>handleQuntity(e)}>-</button>
                         <h3>{quantity}</h3>
                         <button name='increment' onClick={(e)=>handleQuntity(e)}>+</button>
                         
                    </div>
                    <button onClick={handleDelete}>delete</button>
                </div>
                <div className="total-price">
                    <h3>{item.price*quantity}</h3>
                </div>
            </div>
        </>
    )
}