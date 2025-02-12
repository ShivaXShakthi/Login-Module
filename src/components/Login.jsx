import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../utils/axios";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");

    const username = useRef(null);
    const password = useRef(null);

    const validateForm = () => {
        let newErrors = {};
        if (!username.current.value) newErrors.username = "Username is required.";
        if (!password.current.value) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setApiError("");
        
        if (!validateForm()) return;

        const user = {
            username: username.current.value,
            password: password.current.value,
        };

        try {
            const response = await axios.post("token", user, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            login(response.data.token, response.data.roles);
            navigate("/");
        } catch (error) {
            setApiError("Login failed. Please check your credentials and try again.");
        }
    };

    const onCancel = () => {
        navigate(-1);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h1>
                {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input ref={username} type="text" id="username" name="username"
                            className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${errors.username ? "border-red-500" : "border-gray-300"}`} />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input ref={password} type="password" id="password" name="password"
                            className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500" : "border-gray-300"}`} />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-sm text-blue-600 cursor-pointer mt-2" onClick={() => navigate("/signup")}>
                            Signup
                        </p>
                        <p className="text-sm text-blue-600 cursor-pointer mt-2" onClick={() => navigate("/forgot-password")}>
                            Forgot Password?
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={onLogin} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                            Login
                        </button>
                        <button type="button" onClick={onCancel} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
