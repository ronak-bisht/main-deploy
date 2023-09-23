import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import {getProduct,clearErrors} from '../Actions/productAction'
import Card from "./productCard";
import axios from "axios";

export default function Home(){
    const dispatch=useDispatch()
    const [searchParams]=useSearchParams()
    const {product,loading}=useSelector(state=>state.products)
    const typeFilter=searchParams.get('type')
    // const product=useLoaderData()
    console.log(product)
    useEffect(()=>{
        dispatch(getProduct())
        
    },[])
   const data=product && typeFilter?product.filter(item=>item.category==typeFilter):product
  
    return(
        <>
        
            {
                loading?(
                    <h2>loading</h2>
                ):(
                    <div className="main-section">
                <div className="main-heading">
                    <h2>Products</h2>
                    <p>Order it for you or for your beloved ones</p>
                </div>
                <div className="main-products">
                    <div className="main-filter">
                        <Link className={typeFilter?"simple":"selected"} to='/'>All</Link>
                        <Link className={typeFilter=='Hoodie'?"selected":"simple"} to='?type=Hoddie'>Hoodie</Link>
                        <Link className={typeFilter=='Jeans'?"selected":"simple"} to='?type=Jeans'>Tshirt</Link>
                        <Link className={typeFilter=='sweatshirt'?"selected":"simple"} to='?type=sweatshirt'>Sweat-Shirt</Link>
                        
                    </div>
                    <div className="all-products">
                        {
                            product && (
                                <div className="allProducts">
                                {
                                    data.map((item)=>{
                                        return (
                                            <Card product={item}/>
                                        )
                                    })
                                }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
                )
            }
                
            
        
            
        </>
    )
}