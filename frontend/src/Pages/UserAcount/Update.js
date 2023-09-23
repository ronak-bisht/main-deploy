import { useState } from "react"
import { useDispatch } from "react-redux"
import { createProduct, updateProduct } from "../../Actions/createProductAction"

export default function Update({id}){
    console.log(id)
    const [product,setProduct]=useState({})
    const categories=["Tshirt","Shirt","Hoddie","Jeans"]
    const dispatch=useDispatch()
    // const [file,setFile]=useState([])
    console.log(product)
    function handleChange(e){
        const {name,value}=e.target
        setProduct((pre)=>{
            return {...pre,
            [name]:value
            }
        })
    }

    // function handleFile(e){
    //     const selectedFiles=Array.from(e.target.files)
    //     setFile(selectedFiles)
    // }
    function handleSubmit(e){
        e.preventDefault()
       dispatch(updateProduct(id,product))
    }
    return(
        <>
        <h1>UPDATE PRODUCT</h1>
        <div className="create-product">
            <form className="create-form">
                <input type="text" placeholder="Product Name" name="name" value={product.name} onChange={handleChange}/>
                <input type="text" placeholder="Price" name="price" value={product.price} onChange={handleChange}/>
                <input type="text" placeholder="Product Description" name="description" value={product.description} onChange={handleChange}/>
                <select value={product.category} onChange={handleChange} name="category">
                    {/* <option value="">Choose Category</option> */}
                    {
                        categories.map((cate)=>(
                            <option key={cate} value={cate}>{cate}</option>
                        ))
                    }
                </select>
                {/* <input type="file" onChange={handleFile} multiple /> */}
                <input type="submit" value="Create Product" onClick={handleSubmit}/>
            </form>
        </div>
    </>
    )
}