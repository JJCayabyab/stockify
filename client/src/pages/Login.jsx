import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    authError,
    setAuthError,
    authLoading,
    login,
  } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAuthError("All fields are required");
      return;
    }

    // this returns boolean
    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="lg:w-6/12 bg-white shadow-md flex gap-8 flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="bg-gray-800 p-5 lg:w-1/2 flex flex-col items-center justify-center">
          <img
            src="/stockify-logo.svg"
            alt="stockify-logo"
            className="size-18"
          />
          <h2 className="text-4xl font-medium text-center text-white">
            Welcome to <br />
            <span className="text-blue-600 font-bold">Stockify</span>
          </h2>
          <p className="text-white text-center mt-4">
            Manage your inventory efficiently
          </p>
        </div>

        {/* Right Side - Welcome Message */}
        <div className="lg:w-1/2 py-10 lg:py-16 px-12">
          <h1 className="font-bold text-3xl mb-6 text-black">Sign in</h1>

          {authLoading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          )}

          {authError && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md mb-4">
              {authError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-black font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                className="border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:border-blue-600"
                onChange={(e) => setEmail(e.target.value)}
                disabled={authLoading}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-black font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:border-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={authLoading}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md transition"
            >
              {authLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Sample Account Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 text-center lg:w-6/12">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Sample Staff Account
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> juandelacruz@gmail.com
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Password:</span> @juandelacruz2478
        </p>
      </div>

      {/* Video Demo Link */}
      <div className="mt-3 text-center lg:w-6/12">
        <a
          href="https://youtu.be/8q6f_Ls8esw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
          Watch Video Demo
        </a>
      </div>
    </div>
  );
};

export default Login;
