import axios from "axios"
const createProduct=(fileCount,file,product,sizes)=>async(dispatch)=>{

    try{
        const {data}=await axios('http://localhost:4000/getURL',{params:{fileCount},withCredentials:true})
        
        console.log(data.urls)
        console.log(product)

        const images=data.urls.map((img)=>{
            return {
                public_id:"sample",
                url:img.name
            }
        })
        const final={...product,images,sizes:[{size:"S",stock:sizes.S},{size:"M",stock:sizes.M},{size:"L",stock:sizes.L}]}
        const uploadPromises=file.map(async (file,index)=>{
            await axios.put(data.urls[index].link,file,{headers:{'Content-Type':file.type}})
          })

          const produc=await axios.post('http://localhost:4000/admin/product/new',final,{headers:{"Content-Type":"application/json"},withCredentials:true})

    }catch(err){
        console.log(err.response.data.message)
    }
}

const updateProduct=(id,product)=>async(dispatch)=>{
    try{
        const produc=await axios.put(`http://localhost:4000/admin/product/${id}`,product,{headers:{"Content-Type":"application/json"},withCredentials:true})

    }catch(e){
        console.log(e.response.data.message)
    }
}

export {createProduct,updateProduct}