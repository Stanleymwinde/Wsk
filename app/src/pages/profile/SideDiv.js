import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";

import MyCollection from "./sideDiv/MyCollection";
import Inst from "../inst/CreateInst";
import User from "../user/CreateUser";
import Role from "./sideDiv/CreateRole";
import Settings from "./sideDiv/Settings";
import Notification from "./sideDiv/Notification";
import LikedCollection from "./sideDiv/LikedCollection";

import FollowActivity from "./sideDiv/FollowActivity";
import LikedArts from "./sideDiv/LikedArts";

import Category from "./sideDiv/Category";
import Medium from "./sideDiv/Medium";
import { UseAuthContext } from "../../hooks/UseAuthContext";

function SideDiv() {
  const [activeSection, setActiveSection] = useState("stats");
  const [isActivityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const handleActivityDropdownToggle = () => {
    setActivityDropdownOpen(!isActivityDropdownOpen);
  };

  const handleCategoryDropdownToggle = () => {
    setCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const activityButtonContent = {
    default: "Activity",
    likedArts: "Liked Arts",
    likedCollections: "Liked Collections",
    followedArtists: "Followed Artists",
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row pt-5">
      <div className="p-5 w-full lg:w-64 lg:sticky lg:top-0 lg:rounded-lg ">
        {/* Category Dropdown */}
        <button
          className={`py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full ${
            isCategoryDropdownOpen ? "bg-green-500" : ""
          }`}
          onClick={handleCategoryDropdownToggle}
        >
          Category
          <span className="text-xs">{isCategoryDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isCategoryDropdownOpen && (
          <div className="relative mt-2 w-full bg-gray-800 border border-gray-700 rounded-md">
            <ul>
              {/* Add your category and subcategory links here */}
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => setActiveSection("user")}
              >
                Create User
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => setActiveSection("inst")}
              >
                Create Institution
              </li>
              <li
                className="px-4 py-2 text-white cursor-pointer"
                onClick={() => setActiveSection("role")}
              >
                Create Role
              </li>
            </ul>
          </div>
        )}

        {/* Activity Dropdown */}
        <button
          className={`py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full ${
            isActivityDropdownOpen ? "bg-green-500" : ""
          }`}
          onClick={handleActivityDropdownToggle}
        >
          {activityButtonContent[activeSection] ||
            activityButtonContent.default}
          <span className="text-xs">{isActivityDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isActivityDropdownOpen && (
          <div className="relative mt-2 w-full bg-gray-800 border border-gray-700 rounded-md">
            <ul>
              <li
                className={`px-4 py-2 text-white cursor-pointer ${
                  activeSection === "likedArts" ? "bg-green-500" : ""
                }`}
                onClick={() => setActiveSection("likedArts")}
              >
                Liked Arts
              </li>
              <li
                className={`px-4 py-2 text-white cursor-pointer ${
                  activeSection === "likedCollections" ? "bg-green-500" : ""
                }`}
                onClick={() => setActiveSection("likedCollections")}
              >
                Liked Collections
              </li>
              <li
                className={`px-4 py-2 text-white cursor-pointer ${
                  activeSection === "followedArtists" ? "bg-green-500" : ""
                }`}
                onClick={() => setActiveSection("followedArtists")}
              >
                Followed Artists
              </li>
            </ul>
          </div>
        )}

        <button
          className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
          onClick={() => setActiveSection("notification")}
        >
          Notification
        </button>
        <button
          className="py-2 px-4 my-2 rounded-lg bg-gray-500 text-white w-full"
          onClick={() => setActiveSection("settings")}
        >
          Settings
        </button>

        <button
          className="py-2 px-4 my-2 rounded-lg bg-red-500 text-white w-full"
          onClick={handleClick}
        >
          Logout
        </button>

        <div className="mt-auto"></div>
      </div>
      <div className="p-5 w-full max-h-screen overflow-y-scroll hide-scrollbar">
        <div className="p-5 w-full">
          <div className=" bg-gray-900 p-4  rounded-lg max-w-full">
            {activeSection === "user" && <User />}
            {activeSection === "inst" && <Inst />}
            {activeSection === "role" && <Role />}
            {activeSection === "settings" && <Settings />}
            {activeSection === "notification" && <Notification />}
            {activeSection === "followedArtists" && <FollowActivity />}
            {activeSection === "likedArts" && <LikedArts />}
            {activeSection === "likedCollections" && <LikedCollection />}
            {activeSection === "category" && <Category />}

            {activeSection === "medium" && <Medium />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideDiv;
