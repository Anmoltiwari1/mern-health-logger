import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("api/auth/signup", formdata);
      console.log("Signup success:", response.data);
      alert("Signup successful ✅");
      navigate("/login");
    } catch (error) {
      console.error(
        "Signup error",
        error.response?.data?.message || error.message
      );
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md transition duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Sign Up
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formdata.name}
              required
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={formdata.email}
              required
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formdata.password}
              required
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-bold transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
