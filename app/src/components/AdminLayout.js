import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-customBackground">
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
