import React, { useRef, useState } from "react";
import axios from "./../utils/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const username = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const newPassword = useRef(null);
    const confirmPassword = useRef(null);
    
    const [step, setStep] = useState(1); // Step 1: Verification, Step 2: Reset Password
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [usrname, setUsrname] = useState("");

    const handleVerifyUser = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username.current.value || !email.current.value || !phone.current.value) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("verify-user", {
                username: username.current.value,
                email: email.current.value,
                phone: phone.current.value,
            });

            if (response.status === 200) {
                setSuccess("User verified! Proceed to reset your password.");
                setStep(2); // Move to password reset step
                setUsrname(username.current.value);
            } else {
                setError("Verification failed. Please check your details.");
            }
        } catch (err) {
            setError("User verification failed. Please try again.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!newPassword.current.value || newPassword.current.value.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (newPassword.current.value !== confirmPassword.current.value) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("passwordreset", {
                username: usrname,
                password: newPassword.current.value,
            });

            if (response.status === 200) {
                setSuccess("Password reset successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError("Failed to reset password. Try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                {step === 1 ? (
                    // Step 1: Verify User
                    <form onSubmit={handleVerifyUser}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Username</label>
                            <input ref={username} type="text" className="mt-1 p-3 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input ref={email} type="email" className="mt-1 p-3 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input ref={phone} type="text" className="mt-1 p-3 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex gap-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md">
                            Verify
                        </button>
                        <button type="button" onClick={onCancel} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
                            Cancel
                        </button>
                        </div>
                    </form>
                ) : (
                    // Step 2: Reset Password
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">New Password</label>
                            <input ref={newPassword} type="password" className="mt-1 p-3 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                            <input ref={confirmPassword} type="password" className="mt-1 p-3 w-full border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex gap-4">
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md">
                            Reset Password
                        </button>
                        <button type="button" onClick={onCancel} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200">
                            Cancel
                        </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
