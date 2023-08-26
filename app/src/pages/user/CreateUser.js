import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { api } from "../../middleware/Api";

function CreateUser() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAllRoles = async () => {
    try {
      const res = await api("/auth/allRole", "get", {}, {});
      console.log(res.roles);
      setRole(res);
    } catch (error) {}
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  useEffect(() => {
    // Fetch roles from your API and set them to the roles state
    fetch("/api/roles") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setRole(data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  // Simulating fetching roles from the database

  const handleSaveToDatabase = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let data = {
      first_name,
      last_name,
      email,
      role,
    };

    try {
      const res = await api("/auth/register", "post", {}, data);
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Collection created successfully!");
      }, 1000);
    }
  };

  return (
    <main class="flex flex-col justify-center  p-10">
      <h1 class="text-3xl font-bold text-white pb-4"> Create New Category</h1>
      <form onSubmit={handleSaveToDatabase}>
        <div class="w-full rounded-xl bg-white p-5 shadow-white/40">
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            <span className="text-rose-700">*</span>Required fields
          </h2>

          <div class="mb-4 flex flex-col">
            <div className="sm:col-span-4">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={first_name} // Bind input value to name state
                    onChange={(e) => setFirstName(e.target.value)} // Set name state every time input changes
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4 flex flex-col">
            <div className="sm:col-span-4">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={last_name} // Bind input value to name state
                    onChange={(e) => setLastName(e.target.value)} // Set name state every time input changes
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4 flex flex-col">
            <div className="sm:col-span-4">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email <span className="text-rose-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={email} // Bind input value to name state
                    onChange={(e) => setEmail(e.target.value)} // Set name state every time input changes
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role <span className="text-rose-700">*</span>
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select
                  name="role"
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-10"
                >
                  <option value="">Select a role</option>
                  {role.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div class="mb-4 flex flex-col">
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateUser;
