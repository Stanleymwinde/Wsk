import React, { useState } from "react";
import MiniFooter from "../components/MiniFooter";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const Reg_User = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      await axios
        .post(`${ServerUrl}/auth/register`, {
          email: email,
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
        })

        .then((response) => {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
        });

      setSuccessMessage(
        "User registered successfully! Check your email to complete the registration process."
      );

      navigate("/login");
      
      setErrors("");
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setShowInfo(e.target.value !== "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
            </div>
          )}
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

          <h1 className="text-2xl font-bold mt-4">Sign up</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Reg_User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                autoComplete="given-name"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                autoComplete="family-name"
                required
                className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
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
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {showInfo && (
            <p className="text-sm text-gray-500 mt-2">
              You will receive an email to complete your signup in the email you
              provided. Please check your inbox. If you don't see it, check your
              spam folder. If you still don't see it, please
              <Link
                to="/contact"
                className="text-secondary-main text-gray-950 pl-2"
              >
                Contact us
              </Link>
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/login" className="text-sm">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
        <div className="pt-5">
          <MiniFooter />
        </div>
      </div>
    </div>
  );
}
