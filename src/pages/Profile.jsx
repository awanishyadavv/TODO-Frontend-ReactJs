import React, { useContext } from "react";
import { Context } from "../index.js";
import "../styles/Profile.css";
import Loader from "../components/Loader.jsx";
import Login from "./Login.jsx";

const Profile = () => {
  const { isAuthenticated, user, loading } = useContext(Context);
  return (
    <>
      {isAuthenticated ? (
        loading ? (
          <Loader />
        ) : (
          <div className="profile">
            <h2>User Name || {user.name}</h2>
            <p>User Email || {user.email}</p>
          </div>
        )
      ) : (
        <Login />
      )}
    </>
  );
};

export default Profile;
