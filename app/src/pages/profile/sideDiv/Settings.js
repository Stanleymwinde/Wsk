import React, { useRef } from "react";


function Settings() {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and data updates
    // Example: Update the settings in the state or send the data to the server
    const formData = new FormData(event.target);
    const settingsData = Object.fromEntries(formData.entries());
    console.log("Settings data:", settingsData);
  };

  return (
    <section>
      <h1 className="text-2xl text-white font-bold mb-4">Profile Update</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="first_name"
              className="block font-medium text-white mb-1"
            >
              First Name
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="first_name"
              placeholder="Your First Name"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block font-medium text-white mb-1"
            >
              Last Name
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="last_name"
              placeholder="Your Last Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-white mb-1"
            >
              Email
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="email"
              name="email"
              placeholder="Your Email Address"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="password"
              name="password"
              placeholder="Your Password"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block font-medium text-white mb-1"
            >
              Gender
            </label>
            <select
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              name="gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block font-medium text-white mb-1"
            >
              Phone Number
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="phone"
              placeholder="Your Phone Number"
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-medium text-white mb-1">
              City
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="city"
              placeholder="Your City"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block font-medium text-white mb-1"
            >
              Address
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="address"
              placeholder="Your Address"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block font-medium text-white mb-1"
            >
              Country
            </label>
            <input
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              type="text"
              name="country"
              placeholder="Your Country"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block font-medium text-white mb-1">
              Bio
            </label>
            <textarea
              className="w-full bg-customBackground appearance-none border rounded py-2 px-3 text-white leading-tight"
              name="bio"
              placeholder="Tell us something about yourself..."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </form>
    </section>
  );
}

export default Settings;
