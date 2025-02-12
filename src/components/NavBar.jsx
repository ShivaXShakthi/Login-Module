import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-black">
            Home
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? "text-xl bg-black text-white rounded-2xl py-2 px-4 font-bold"
                  : "text-xl text-black font-bold py-2 px-4 rounded"
              }
            >
              Events
            </NavLink>

            {!token && (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-xl bg-black text-white rounded-2xl py-2 px-4 font-bold"
                    : "text-xl text-black font-bold py-2 px-4 rounded"
                }
              >
                Signup
              </NavLink>
            )}

            {!token && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-xl bg-black text-white rounded-2xl py-2 px-4 font-bold"
                    : "text-xl text-black font-bold py-2 px-4 rounded"
                }
              >
                Login
              </NavLink>
            )}

            {token && (
              <button
                onClick={handleLogout}
                className="text-xl text-black font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <NavLink
            to="/events"
            className="block py-2 px-4 text-black hover:bg-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </NavLink>

          {!token && (
            <NavLink
              to="/signup"
              className="block py-2 px-4 text-black hover:bg-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Signup
            </NavLink>
          )}

          {!token && (
            <NavLink
              to="/login"
              className="block py-2 px-4 text-black hover:bg-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          )}

          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-4 text-black hover:bg-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
