import logo from './logo.svg';
import './App.css';
import { Route,Routes,createBrowserRouter,createRoutesFromElements,RouterProvider, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Cart from './Pages/cart/Cart';
import Login from './Pages/User/LoginRegister';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/userAction';
import Account from './Pages/UserAcount/Account';
import axios from 'axios';
import store from './Store';
import Protected from './utils/protectedRoutes';
import Shipping from './Components/Shipping/Shipping';
import ConfirmOrder from './Components/ConfirmOrder/ConfirmOrder';
import OrderSuccess from './Components/ConfirmOrder/OrderSuccess';
import MyOrders from './Pages/MyOrders/MyOrders';
import AdminDashboard from './Pages/UserAcount/AdminDashboard';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  const {isAuthenticated,loading}=useSelector(state=>state.user)

  // const router=createBrowserRouter(createRoutesFromElements(
  //   <Route path='/' element={<Layout />}>
  //         <Route index element={<Home />}
  //          loader={async ()=>{
  //           const {data}=await axios('http://localhost:4000/')
  //           return data.products
  //          }}
  //         />
  //         <Route path='product/:id' element={<ProductDetail />}
  //           loader={async ({params})=>{
              
  //             const id=params.id
  //             const {data}=await axios(`http://localhost:4000/product/${id}`)
  //             console.log(data)
  //             return data
  //            }}
  //         />
  //         <Route path='cart' element={<Cart />}/>
  //         <Route path='login' element={<Login />} />
          
  //         <Route path='account' element={<Protected isAuthenticated={isAuthenticated}/>}>
  //           <Route index element={<Account />} />
  //         </Route>
         
  //       </Route>
  // ))
  return (
    <div className="App">
       {/* <RouterProvider router={router} /> */}
       <BrowserRouter>
          <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='frontend/product/:id' element={<ProductDetail />}  />
          <Route path='cart' element={<Cart />}/>
          <Route path='login' element={<Login />} />
          
          <Route  element={<Protected isAuthenticated={isAuthenticated}/>}>
            <Route path='account' element={<Account />} />
            <Route path='shipping' element={<Shipping/> } />
            <Route path='confirm' element={<ConfirmOrder />} />
            <Route path='success/:id' element={<OrderSuccess />}/>
            <Route path='frontend/orders/me' element={<MyOrders />}/>
            
            <Route path='account/admin-dashboard' element={<AdminDashboard/>} />
          </Route>
          {/* <Route  element={<Protected isAuthenticated={isAuthenticated}/>}>
            
          </Route> */}
         
        </Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
