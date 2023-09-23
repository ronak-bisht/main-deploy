import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../Actions/userAction"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getAllOrders } from "../../Actions/orderAction"

export default function Account(){
    const {user,loading,isAuthenticated}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
function handleLougout(){
  dispatch(logout())
  navigate('/')
}
function handleMyOrders(){
    dispatch(getAllOrders())
    navigate('frontend/orders/me')
}


    return(
        <>

        <div className="account">
        <h2>{user.user.name}</h2>
            <h2>{user.user.email}</h2>
            {user.user.role=='admin' && <Link to='admin-dashboard'><button>Admin Daashboard</button></Link>}

                <div>
                    
                        <button onClick={handleMyOrders}>My Orders</button>
                        <button onClick={handleLougout}>Logout</button>
                    
                    
                </div>
        </div>
           
            
        </>
        
    )
}