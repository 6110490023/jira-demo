import React, { useState, useEffect } from "react";
import { UseAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { getCookies } from "../store/useCookies"

import { useAlert } from "../context/AlertContext";

const Register: React.FC = () => {
    const { register } = UseAuth();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [roleName, setRoleName] = useState("");
    useEffect(() => {
        const token = getCookies("authToken");
        if (token) {
            navigate("/");
            showAlert("คุณได้ทำการ login เเล้ว", "info")
        }
    }, [navigate]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            showAlert("Passwords do not match", "error");
            return;
        }

        if (roleName === "") {
            showAlert("Please select a role", "error");
            return;
        }

        try {
            const response = await register({
                username,
                password,
                email,
                roleName
            });

            if (response.success) {
                showAlert(response.message, "success");
                navigate("/login");
            } else {
                showAlert(response.message, "error");
            }
        } catch (error) {
            showAlert("Registration failed:", "error");
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-600 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-gray-600 mb-2">Role</label>
                        <select
                            id="role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="developer">developer</option>
                            <option value="tester">tester</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
