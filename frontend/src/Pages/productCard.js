import { Link } from "react-router-dom"

export default function Card({product}){
    return(
        <>
        <Link to={`frontend/product/${product._id}`} >
          <div className="product-card">
             <div className="card-img">
             <img src={`https://fiend.s3.ap-south-1.amazonaws.com/admin-uploads/${product.images[0].url}`}/>
             </div> 
             <div className="card-detail">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <h3>₹{product.price}</h3>
             </div>
             
          </div>
          </Link>
        </>
    )
}