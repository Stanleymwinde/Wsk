import React, { useState } from "react";
import MiniFooter from "../components/MiniFooter";
import axios from "axios";
import { ServerUrl } from "../config/ServerUrl";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const Reset_Password = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation

    try {
      await axios.post(`${ServerUrl}/auth/reset_password/${token}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

     
      setTimeout(() => {
        setSuccessMessage("Password reset successfully!");
        setErrors("");
        setIsLoading(false); // Stop loading animation
      }, 3000);

      navigate("/login");
      
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
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
          <h1 className="text-2xl font-bold mt-4">Reset Password</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Reset_Password}>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Added Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirm_password"
              autoComplete="new-password"
              required
              className="mt-1 px-4 py-3 rounded-lg w-full border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        </form>
        <MiniFooter />
      </div>
    </div>
  );
}
