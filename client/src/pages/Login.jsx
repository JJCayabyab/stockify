import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { email, password, setEmail, setPassword, login, error } =
    useAuthStore();
  const navigate = useNavigate();
  const success = null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 p-6 bg-white rounded-xl shadow-md">
        <h1 className="font-bold text-3xl text-center mb-6">Sign in</h1>
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              className="border rounded-md p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-400 text-white py-2 rounded-md"
          >
            Submit
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
