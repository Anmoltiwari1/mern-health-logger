import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/auth/login", formdata);
      localStorage.setItem("token", response.data.token);
      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed ❌");
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-6 text-center">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don’t have an account?
            <a
              href="/signup"
              className="ml-1 text-cyan-400 hover:underline hover:text-cyan-300 transition"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
