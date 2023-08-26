import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";
import Footer from "./components/Footer";
import Login from "./authentication/Login";
import Profile from "./pages/profile/Profile";
import About from "./layouts/About";
import ErrorPage from "./layouts/ErrorPage";

const Layout = () => {
  return (
    <div className="bg-customBackground">
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },

      { path: "/about", element: <About /> },
      { path: "/account/profile", element: <Profile /> },
    ],
  },

  { path: "/navbar", element: <Navbar /> },
  { path: "/footer", element: <Footer /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
