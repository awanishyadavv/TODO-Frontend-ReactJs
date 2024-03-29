import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Context } from "../index.js";
import axios from "axios";
import { server } from '../index.js';
import toast from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated , loading, setLoading} = useContext(Context);

  const logoutHandler = async (e) =>{
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,{
        withCredentials:true,
      });
      setIsAuthenticated(false);
      toast.success("Logout Successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } 
  };



  return (
    <nav className="header">
      <div>
        <h2>TODO APP</h2>
      </div>
      <article>
        <Link to={"/"} className="link">
          HOME{" "}
        </Link>
        <Link to={"/profile"} className="link">
          PROFILE
        </Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">LOGOUT</button>
        ) : (
          <Link to="/login" className="link">
            LOGIN
          </Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
