import React, { useState, useEffect, useRef } from "react";
import { GoVerified } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { api } from "../../../middleware/Api";
import ProfileInfoTwo from "./ProfileInfoTwo";

function ProfileInfo() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [roles, setRoles] = useState([]); // Array of user roles [user, admin, moderator
  const [tempCoverImageFile, setTempCoverImageFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        const { first_name, last_name, cover_photo, roles } = userData;
        setFirstName(first_name);
        setLastName(last_name);
        setCoverPhoto(cover_photo);
        setRoles(roles);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempCoverImageFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempCoverImageFile(file);
      setIsEditing(true);
    }
  };

  const handleImageSave = async () => {
    try {
      const formData = new FormData();
      formData.append("image", tempCoverImageFile);

      const response = await api(
        "/user/replace_cover_image",
        "patch",
        {},
        formData
      );

      if (response) {
        setSuccessMessage("Profile image updated successfully");
        setErrors("");

        // Update local storage cover_photo with the new image URL
        const updatedUserData = JSON.parse(localStorage.getItem("user"));
        updatedUserData.cover_photo = URL.createObjectURL(tempCoverImageFile);
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        setCoverPhoto(updatedUserData.cover_photo); // Update the cover_photo state
        setIsEditing(false);
        setTempCoverImageFile(null);
      } else {
        setErrors("An error occurred");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <div className="bg-gray-900 h-40 relative group">
        <img
          src={
            isEditing ? URL.createObjectURL(tempCoverImageFile) : cover_photo
          }
          alt="Banner Image"
          className="h-80 w-full object-cover"
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isEditing ? "bg-blue-500" : "bg-gray-900 bg-opacity-50"
          } rounded-full p-4 cursor-pointer`}
        >
          {isEditing ? (
            <div>
              <button
                onClick={handleImageSave}
                className="text-white text-base mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="text-white text-base"
              >
                Cancel
              </button>
            </div>
          ) : (
            <AiFillEdit
              className="text-white text-2xl"
              onClick={handleEditClick}
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="relative flex items-center p-4 mt-20">
        <ProfileInfoTwo />
        <div>
          <h1 className="text-2xl pt-10 text-white font-semibold">
            {first_name} {last_name}
          </h1>
          <div className="flex gap-1">
            <div className="flex gap-1">
              {roles.map((role) => {
                if (role === "admin") {
                  return (
                    <MdOutlineAdminPanelSettings
                      key={role}
                      className="text-2xl text-white font-semibold"
                    />
                  );
                } else if (role === "user") {
                  return (
                    <HiUser
                      key={role}
                      className="text-2xl text-white font-semibold"
                    />
                  );
                } else if (role === "verified") {
                  return (
                    <GoVerified 
                      key={role}
                    className="text-2xl text-white font-semibold" />
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
