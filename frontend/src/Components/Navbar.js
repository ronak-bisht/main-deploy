import { NavLink,Link } from "react-router-dom";
import cartImg from '../assets/Cart.svg'
import progileImg from '../assets/Profile.svg'
import { useSelector } from "react-redux";
export default function Navbar(){
    const {user,isAuthenticated}=useSelector(state=>state.user)
    
    return(
        <>
           <div className="nav-bar">
                <div className="logo"><Link to='/'>Fiend</Link></div>
                <div className="navigation">
                    <NavLink className='navigation-icon'>Discovery</NavLink>
                    <NavLink className='navigation-icon'>About</NavLink>
                    <NavLink className='navigation-icon'>Contact us</NavLink>
                </div>
                <div className="icons">
                    <Link className={user?"disable":""} to='login'>Login</Link>
                    <Link to='cart'><img src={cartImg}/></Link>
                    <Link to='account' className={isAuthenticated?"":"disable"}><img src={progileImg} /></Link>
                </div>
           </div>
        </>
    )
}