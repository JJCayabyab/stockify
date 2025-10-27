import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import logo from "../../public/stockify-logo.svg";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-6/12  bg-white   shadow-md flex   smgap-8 flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className=" bg-gray-800 p-5 lg:w-1/2 flex flex-col items-center justify-center">
          <img src={logo} alt="stockify-logo" className="size-18" />
          <h2 className="text-4xl font-medium text-center text-white">
            Welcome to <br />{" "}
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
    </div>
  );
};

export default Login;
