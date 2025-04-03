import React, { useState, useEffect } from "react";
import { UseAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { setCookies, getCookies } from "../store/useCookies"

import { useAlert } from "../context/AlertContext";

const Login: React.FC = () => {
    const { login } = UseAuth();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    useEffect(() => {
        const token = getCookies("authToken");
        if (token) {
            navigate("/");
            showAlert("คุณได้ทำการ login เเล้ว", "info")
        }
    }, []);
    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ username: username, password: password });

            if (response.success) {
                setCookies("authToken", response.result);
                showAlert(response.message, "success")
                navigate("/");
            } else {
                showAlert(response.message, "error")
            }
        } catch (error) {
            showAlert("Login failed:", "error")
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-600 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="username"
                            className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>

                </form>
                <div className="flex w-full mt-3" >
                    <button className="text-blue-500 ml-auto" onClick={() => { handleRegister() }}>go to register</button>

                </div>
            </div>
        </div>
    );
};

export default Login;
