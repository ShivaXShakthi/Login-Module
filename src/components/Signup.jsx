import React, { useRef, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // Install this library using npm

const Signup = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState("");
    const [usernameAvailable, setUsernameAvailable] = useState(null);

    const firstname = useRef(null);
    const lastname = useRef(null);
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const contact = useRef(null);

    // Function to check if username is available
    const checkUsername = debounce(async (usernameValue) => {
        if (!usernameValue) return;
        try {
            const response = await axios.get(`check-username?username=${usernameValue}`);
            setUsernameAvailable(!response.data);
        } catch (error) {
            setUsernameAvailable(null);
        }
    }, 500); // Debounce to reduce API calls

    const validateForm = () => {
        let newErrors = {};

        if (!firstname.current.value) newErrors.firstname = "First name is required.";
        if (!lastname.current.value) newErrors.lastname = "Last name is required.";
        if (!username.current.value) newErrors.username = "Username is required.";
        if (!email.current.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.current.value)) {
            newErrors.email = "Valid email is required.";
        }
        if (!password.current.value || password.current.value.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        if (password.current.value !== confirmPassword.current.value) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        if (!contact.current.value || !/^\d{10}$/.test(contact.current.value)) {
            newErrors.contact = "Valid 10-digit phone number is required.";
        }
        if (usernameAvailable === false) {
            newErrors.username = "Username is already taken.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSignUp = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validateForm()) return;

        const user = {
            firstName: firstname.current.value,
            lastName: lastname.current.value,
            username: username.current.value,
            password: password.current.value,
            email: email.current.value,
            phno: contact.current.value,
            enabled: true,
        };

        try {
            await axios.post("registeruser", user, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setApiError("Signup failed. Please try again.");
        }
    };

    const onCancel = () => {
        navigate(-1);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Account</h1>
                {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form>
                    {["firstname", "lastname", "username", "email", "password", "confirmPassword", "contact"].map((field) => (
                        <div key={field} className="mb-4">
                            <label htmlFor={field} className="block text-sm font-medium text-gray-600">
                                {field.replace(/([A-Z])/g, " $1").replace("confirm Password", "Confirm Password").charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                ref={{ firstname, lastname, username, email, password, confirmPassword, contact }[field]}
                                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                                id={field}
                                name={field}
                                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
                                onChange={field === "username" ? (e) => checkUsername(e.target.value) : null}
                            />
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                            {field === "username" && usernameAvailable === false && <p className="text-red-500 text-sm mt-1">Username is already taken.</p>}
                            {field === "username" && usernameAvailable === true && <p className="text-green-500 text-sm mt-1">Username is available.</p>}
                        </div>
                    ))}

                    <div className="flex gap-4">
                        <button onClick={onSignUp} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                            Sign Up
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

export default Signup;
