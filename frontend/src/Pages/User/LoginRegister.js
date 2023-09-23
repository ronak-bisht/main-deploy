import { useState,useEffect } from "react"
import { login, register } from "../../Actions/userAction"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { clearErrors } from "../../Actions/userAction";
export default function Login(){
    const [userLogin,setUserLogin]=useState({email:"",password:""})
    const [userRegister,setUserRegsiter]=useState({name:"",email:"",password:""})
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const {user,isAuthenticated,loading,error}=useSelector(state=>state.user)
    function handleLogin(e){
        e.preventDefault()
        dispatch(register(userRegister.name,userRegister.email,userRegister.password))
        
    }

    function handleSubmit(e){
        e.preventDefault()
       
        dispatch(login(userLogin.email,userLogin.password))

    }
    function handleChange(e){
        const {name,value}=e.target
        setUserLogin((pre)=>{
            return {
                ...pre,
                [name]:value
            }
        })
    }
    useEffect(()=>{
        console.log('useeffect')
        const red=location.search?"/"+location.search.split("=")[1]:"/"
        console.log("isAuthentici  "+isAuthenticated)
        if(error){
            console.log('inside error')
            toast.error(error,{
                position:"top-center"
            })
            console.log('error msg')
            dispatch(clearErrors())
        }
        if(isAuthenticated){
          navigate(red,{replace:true})
          console.log(loading)
        }

    },[isAuthenticated])

    function handleRegister(e){
        const {name,value}=e.target
        setUserRegsiter((pre)=>{
            return {
                ...pre,
                [name]:value
            }
        })
    }

    return(
        <>
        {
        
        loading?(

            <h2>loading</h2>
        ):(

            <div className="login-register">
                <div className="login">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className='login-form'>

                        <label>email</label>
                        <input name='email' value={userLogin.email} onChange={handleChange} type="text" />
                        <label>password</label>
                        <input name='password' value={userLogin.password} type="password" onChange={handleChange}/>
                        <button type="submit" >Login</button>
                    </form>
                </div>
                <div className="register">
                <h2>Register</h2>
                    <form className='register-form' onSubmit={handleLogin}>
                    <label>name</label>
                        <input name='name' value={userRegister.name} type="text" onChange={handleRegister}/>
                        <label>email</label>
                        <input name='email' value={userRegister.email} type="text" onChange={handleRegister}/>
                        <label>password</label>
                        <input type="password" name="password" value={userRegister.password} onChange={handleRegister}/>
                        <button name='password' value={userRegister.password} type="submit">Register</button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        )
        
        
        }
            
        </>
    )
}