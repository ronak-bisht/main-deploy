
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected({isAuthenticated}){
  console.log(isAuthenticated)
  const {loading}=useSelector(state=>state.user)
  
  if(loading==false){
    if(!isAuthenticated){
      return <Navigate to={'/login'} />
     }
     return <Outlet />
  }
   
  
  
       
    
 
}