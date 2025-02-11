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

  const navLinks = [
    { to: "/events", label: "Events" },
    { to: "/signup", label: "Signup" },
    { to: "/login", label: "Login" }
  ];

    /** create navbar with login signup options */
    
    return (
        <div className="flex justify-between items-center text-white p-4">
            <NavLink to="/" className="text-2xl font-bold text-black">
                    Home
            </NavLink>
            <div className="flex space-x-4">
                {/* <NavLink to="/events"  className="text-black text-xl font-bold py-2 px-4 rounded">
                    Events
                </NavLink>
                <NavLink to="/login" className=" text-black text-xl font-bold py-2 px-4 rounded">
                    Login
                </NavLink>
                <NavLink to="/signup" className=" text-black text-xl font-bold py-2 px-4 rounded">
                    Signup
                </NavLink> */}

{/* {navLinks.map(({ to, label }) => {
           if(label ==  "Signup" && token != null){
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white rounded-2xl py-2 px-4 text-xl font-bold"  // Active link styles
                : "text-black text-xl font-bold py-2 px-4 rounded"  // Inactive link styles
            }
          >
            {label}
          </NavLink>
        }
    }
        )} */}



        <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white rounded-2xl py-2 px-4 text-xl font-bold"  // Active link styles
                : "text-black text-xl font-bold py-2 px-4 rounded"  // Inactive link styles
            }
          >
            Events
          </NavLink>

        { token == null &&
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white rounded-2xl py-2 px-4 text-xl font-bold"  // Active link styles
                : "text-black text-xl font-bold py-2 px-4 rounded"  // Inactive link styles
            }
          >
            Signup
          </NavLink>
}

{ token == null &&
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white rounded-2xl py-2 px-4 text-xl font-bold"  // Active link styles
                : "text-black text-xl font-bold py-2 px-4 rounded"  // Inactive link styles
            }
          >
            Login
          </NavLink>
}


{ token != null && 
                <button onClick={handleLogout} className=" text-black text-xl font-bold py-2 px-4 rounded">
                    Logout
                </button>}
            </div>
        </div>
    );

}


export default NavBar;