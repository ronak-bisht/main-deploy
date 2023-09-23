import { useState } from "react"
import { useDispatch } from "react-redux"
import { createProduct } from "../../Actions/createProductAction"

export default function CreateProduct(){
    const [product,setProduct]=useState({name:"",price:1000,description:"",category:""})
    const [sizes,setSizes]=useState({S:0,M:0,L:0})
    const categories=["Tshirt","Shirt","Hoddie","Jeans"]
    const dispatch=useDispatch()
    const [file,setFile]=useState([])
    function handleChange(e){
        const {name,value}=e.target
        setProduct((pre)=>{
            return {...pre,
            [name]:value
            }
        })
    }

    function handleSize(e){
        const {name,value}=e.target
        
            setSizes((pre)=>{
                return {
                    ...pre,
                    [name]:value
                }
            })
        

    }

    function handleFile(e){
        const selectedFiles=Array.from(e.target.files)
        setFile(selectedFiles)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(createProduct(file.length,file,product,sizes))
    }
    console.log(product)
    console.log(sizes)
    return(
        <>
            <div className="create-product">
                <form className="create-form">
                    <input type="text" placeholder="Product Name" name="name" value={product.name} onChange={handleChange}/>
                    <input type="text" placeholder="Price" name="price" value={product.price} onChange={handleChange}/>
                    <input type="text" placeholder="Product Description" name="description" value={product.description} onChange={handleChange}/>
                    <span>Small stock</span>
                    <input type="text" placeholder="S-Stock" name="S" value={sizes.S} onChange={handleSize}/>
                    <span>Medium stock</span>
                    <input type="text" placeholder="M-Stock" name="M" value={sizes.M} onChange={handleSize}/>
                    <span>Large stock</span>
                    <input type="text" placeholder="L-Stock" name="L" value={sizes.L} onChange={handleSize}/>
                    <select value={product.category} onChange={handleChange} name="category">
                        {/* <option value="">Choose Category</option> */}
                        {
                            categories.map((cate)=>(
                                <option key={cate} value={cate}>{cate}</option>
                            ))
                        }
                    </select>
                    <input type="file" onChange={handleFile} multiple />
                    <input type="submit" value="Create Product" onClick={handleSubmit}/>
                </form>
            </div>
        </>
    )
}