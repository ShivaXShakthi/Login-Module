import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const NavBar = () => {

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the token
    navigate("/login"); // Redirect to the login page
  };

    /** create navbar with login signup options */
    
    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <NavLink to="/" className="text-2xl font-bold">
                    Home
            </NavLink>
            <div className="flex space-x-4">
                <NavLink to="/events" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Events
                </NavLink>
                <NavLink to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </NavLink>
                <NavLink to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Signup
                </NavLink>
                <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </div>
    );

}


export default NavBar;