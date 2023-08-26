import React, { useState } from "react";
import MiniFooter from "../components/MiniFooter";
import { Link } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Reset_Password = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      await axios.post(`${ServerUrl}/auth/forgot_password`, {
        email: email,
      });

      setSuccessMessage("Recovery email sent successfully!");

      setErrors("");
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
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
          <h1 className="text-2xl font-bold mt-4">Forgort Password</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Reset_Password}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-bold rounded-lg"
            >
              Reset Password
            </button>
          </div>
          <div className="flex justify-end">
            <Link to="/login" className="text-sm">
              Recovered credentials? Sign in
            </Link>
          </div>
        </form>
        <MiniFooter />
      </div>
    </div>
  );
}
