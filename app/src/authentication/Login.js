import React, { useState } from "react";
import MiniFooter from "../components/MiniFooter";
import { Link, useNavigate } from "react-router-dom";

import { UseAuthContext } from "../hooks/UseAuthContext";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const Login_User = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      await axios
        .post(`${ServerUrl}/auth/login`, {
          emailOrUsername: emailOrUsername,
          password: password,
        })

        .then((response) => {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
        });

      setSuccessMessage("User logged in successfully!");

      navigate("/");
      
      setErrors("");
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden sm:block bg-cover bg-center w-2/4"
        style={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
        }}
      />
      <div className="w-full sm:w-2/4 bg-gray-50">
        <div className="max-w-md mx-auto py-8 px-4">
          <div className="flex flex-col items-center">
            <div className="bg-secondary-main rounded-full p-2">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 11a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21v-2a4 4 0 00-3-3h-2a10 10 0 00-5-1.465m-4.14 2.237A10.001 10.001 0 002 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-.84 0-1.662-.104-2.465-.303m-1.054-2.14c.348-.214.73-.375 1.128-.485M16 16l4.879 4.879M16 16l-4.879 4.879M16 16L11.121 20.879M16 16L11.121 11.121M16 16L16 11.121"
                />
              </svg>
            </div>
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
              </div>
            )}
            <h1 className="mt-4 text-2xl font-bold">Log In</h1>
          </div>
          <form className="mt-6" onSubmit={Login_User}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address or Username
              </label>
              <input
                type="text"
                id="email or username"
                name="email or username"
                autoComplete="email or username"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {(errors || successMessage) && (
              <div
                className={`p-3 rounded-lg mt-4 ${
                  errors
                    ? "text-red-500 bg-red-100"
                    : "text-green-500 bg-green-100"
                }`}
              >
                {errors || successMessage}
              </div>
            )}

            <div className="mt-4">
              <button
                type="submit"
                className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
              >
                Sign In
              </button>
            </div>
            {/* <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm">
                Forgot password?
              </Link>
            </div> */}
            {/* <div className="mt-4 text-center">
              <Link to="/signup" className="text-sm">
                Don't have an account? Sign Up
              </Link>
            </div> */}
          </form>
        </div>
        <MiniFooter />
      </div>
    </div>
  );
};

export default Login;
