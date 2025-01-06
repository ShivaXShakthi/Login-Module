import React from "react";

const Signup = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/3">
                <h1 className="text-2xl font-bold mb-4">Signup</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="firstname" id="firstname" name="firstname" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="lastname" id="lastname" name="lastname" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">User Name</label>
                        <input type="username" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="contact" id="contact" name="contact" className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;