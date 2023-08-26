import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ServerUrl } from "../../config/ServerUrl";
import Navbar from "../../components/Navbar";

import SideDiv from "./SideDiv";
import ProfileInfo from "./sideDiv/ProfileInfo";

function Profile() {
  return (
    <div>
      <Navbar />

      <SideDiv />
    </div>
  );
}

export default Profile;
