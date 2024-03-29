import React, { useContext, useState } from 'react'
import { Link, Navigate} from 'react-router-dom'
import '../styles/Login.css'
import axios from "axios";
import { server } from '../index.js';
import toast from 'react-hot-toast';
import { Context } from '../index.js';


const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated  , loading, setLoading} = useContext(Context);
  
  const registerHandler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/new`,{
        name,email,password
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
            <form onSubmit={registerHandler}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" placeholder='Enter your Email' required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder='Enter your Password' required/>
                <button type='submit' className='btn'>Sign Up</button>
                <h3>Or</h3>
                <Link to="/login" className='login-signup'>Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Register;