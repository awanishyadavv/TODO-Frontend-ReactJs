import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Login.css'
import { Context } from '../index.js';
import axios from "axios";
import { server } from '../index.js';
import toast from 'react-hot-toast';

const Login = () => {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated  , loading, setLoading} = useContext(Context);

  const loginHandler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/login`,{
        email,password
      }, {
        header:{
          "Content-Type":"application/json",
        },
        withCredentials:true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } 
  };
  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className='container'>
        <section>
            <form onSubmit={loginHandler}>
            <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" placeholder='Enter your Email' required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder='Enter your Password' required/>
                <button disabled={loading} type='submit' className='btn'>LOGIN</button>
                <h3>Or</h3>
                <Link to="/register" className='login-signup'>Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login