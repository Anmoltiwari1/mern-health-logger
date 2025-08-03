import React from "react";
import logo from "../assets/logo.jpeg"; // Ensure this exists
import healthImage from "../assets/health-track.jpg"; // Ensure this exists
import health1 from "../assets/health1.jpg"; // Ensure this exists

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h3 className="text-2xl font-bold">Health Logger App</h3>
        </div>
        <div className="space-x-4">
          <a href="/signup" className="hover:underline text-lg font-medium">
            Signup
          </a>
          <a href="/login" className="hover:underline text-lg font-medium">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 bg-gray-50">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Track Your Health, Stay in Control
          </h1>
          <p className="text-gray-600 text-lg">
            We help you log workouts, monitor habits, and stay motivated on your
            wellness journey. Easy. Smart. Reliable.
          </p>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Get Started
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={healthImage}
            alt="Health Tracking"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Additional Image Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-white">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src={health1}
            alt="Tracking Features"
            className="w-full max-w-md rounded-2xl shadow-md"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Visualize Your Progress
          </h2>
          <p className="text-gray-600 text-lg">
            Get detailed charts and insights on your daily habits and physical
            activities. Health tracking made beautifully simple.
          </p>
          <a
            href="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Log In & View Stats
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
