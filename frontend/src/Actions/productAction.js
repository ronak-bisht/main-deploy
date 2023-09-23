import axios from "axios"
import { clearError, productFail,productRequest,productSuccess } from "../Reducers/ProductReducer"
export const getProduct=()=>async(dispatch)=>{
    try{
        // dispatch(productRequest())
        const {data}=await axios.get('http://localhost:4000/all-product')
        dispatch(productSuccess(data.products))
    }catch(err){
        dispatch(productFail(err.message))
    }
}
export const clearErrors=()=>async(dispatch)=>{

    dispatch(clearError())
}

