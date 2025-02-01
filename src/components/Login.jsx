import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../utils/axios";

const Login = () => {

    const navigate = useNavigate();

    const username = useRef(null);
    const password = useRef(null);


    const onLogin = async (e) => {
        e.preventDefault();
        const user = {
            username : username.current.value,
            password : password.current.value
        }
        console.log("Login clicked");
        const response = await axios.post("token", user, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        });
        console.log(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("roles", response.data.roles);
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/3">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
                        <input ref={username} type="text" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input ref={password} type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <button onClick={onLogin} type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                </form>
            </div>
        </div>
    );

}

export default Login;