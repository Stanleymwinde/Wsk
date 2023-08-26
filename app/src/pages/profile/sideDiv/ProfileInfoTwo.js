import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { api } from "../../../middleware/Api";

function ProfileInfoTwo({ updateCoverPhoto }) {
  const [image, setImage] = useState("");
  const [tempProfileImageFile, setTempProfileImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        const { image } = userData;
        setImage(image);
      }
    };
    fetchData();
  }, []);

  const handleEditProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setTempProfileImageFile(file);
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    setImage(image); // Revert to the previous image
    setIsEditing(false);
    setTempProfileImageFile(null);
  };

  const handleImageSave = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", tempProfileImageFile);

      const response = await api("/user/replace_image", "patch", {}, formData);

      if (response) {
        setSuccessMessage("Profile image updated successfully");
        setErrors("");

        // Update image URL directly in local storage
        const updatedUserData = JSON.parse(localStorage.getItem("user"));
        updatedUserData.image = URL.createObjectURL(tempProfileImageFile);
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        setImage(updatedUserData.image);
      } else {
        setErrors("An error occurred");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrors(error.message || "An error occurred");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setTempProfileImageFile(null);
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          src={image}
          alt="Profile Image"
          className="h-40 w-40 rounded-full object-cover mr-4"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center cursor-pointer ${
            isEditing
              ? "hidden"
              : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          }`}
          onClick={handleEditProfileImageClick}
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <AiFillEdit className="text-gray-900 text-2xl" />
        </div>
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 h-40 w-40 rounded-full">
            <div className="text-white text-base">
              <button onClick={handleImageSave} className="mr-2 bg-transparent">
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="mr-2 bg-transparent"
              >
                Cancel
              </button>
            </div>
          </div>
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
  );
}

export default ProfileInfoTwo;