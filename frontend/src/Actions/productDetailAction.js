import axios from "axios";
import { productDetailFail,productDetailSuccess,productDetailRequest, deleteProductRequest } from "../Reducers/ProductDetailReducer";
import { productFail } from "../Reducers/ProductReducer";

const getProductDetail=(id)=>async(dispatch)=>{
    try{
        dispatch(productDetailRequest())
        const {data}=await axios(`http://localhost:4000/product/${id}`)
        
        dispatch(productDetailSuccess(data))
    }catch(err){
        dispatch(productFail(err.message))
    }
}

const deleteProduct=(id)=>async(dispatch)=>{
    console.log(id)
    try{
        
        const {data}=await axios.delete(`http://localhost:4000/admin/product/${id}`,{withCredentials:true})
        
        
    }catch(e){
        console.log(e.response.data.message)
    }
}

export {getProductDetail,deleteProduct}