import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

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
            </div>
        </div>
    );

}


export default NavBar;