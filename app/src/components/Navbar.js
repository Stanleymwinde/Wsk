import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";

import Search from "./search/Search";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle, BiSolidCollection, BiCategoryAlt } from "react-icons/bi";
import { AiFillPicture } from "react-icons/ai";
import { UseAuthContext } from "../hooks/UseAuthContext";
import image_one from "../assets/images/image_one.jpeg";
import { SiMaterialdesignicons } from "react-icons/si";
import MobileSearch from "./search/MobileSearch";

export default function Navbar() {
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();
  const { user } = UseAuthContext();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!localStorage.getItem("user")) {
      setLoading(true);
      return;
    }

    const { image } = JSON.parse(localStorage.getItem("user"));

    setImage(image);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const navigation = [
    { name: "About", href: "/about", current: false },
    { name: "Company", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50">
      <Disclosure as="nav" className="bg-gray-800 ">
        {({ open }) => (
          <div className="h-20 pt-1">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {/* {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )} */}
                  </Disclosure.Button>
                </div>

                <div className="flex lg:flex-1 items-center justify-center mt-1">
                  <Link
                    to="/"
                    className="-m-1.5 p-1.5 lg:pl-0 w-full lg:w-auto lg:inline-block pl-12"
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://i.seadn.io/gcs/files/365d0c7270b8cecd800e84279c01ebd5.jpg?auto=format&dpr=1&w=136&h=136&fr=1"
                      alt=""
                    />
                  </Link>

                  <span className="pl-3 font-bold text-gray-200 text-sm sm:text-xl lg:text-lg relative">
                    ArtsMarket
                    <span className="absolute top-0 right-[-14px] h-8 border-l-2 border-gray-700 font-bold hidden lg:block"></span>
                  </span>

                  <div className="flex lg:flex-1 items-center pl-9 hidden lg:block">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:text-white",
                          "text-base sm:text-lg font-bold mr-4"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Desktop Search */}
                <Search />

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                  <div className="flex ">
                    {/* Search Button */}
                    <MobileSearch />
                  </div>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user && user.email ? (
                          loading ? (
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 border-opacity-50"></div>
                          ) : (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={image}
                              alt=""
                            />
                          )
                        ) : (
                          <div>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={image_one}
                              alt=""
                            />{" "}
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/account/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <BiUserCircle className="text-sm" /> Your
                                  Profile
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user && (
                          <Menu.Item className="lg:hidden">
                            {({ active }) => (
                              <Link
                                to="/create-category"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <AiOutlineBell
                                    className="h-4 w-4 text-sm"
                                    aria-hidden="true"
                                  />
                                  Notification (2)
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/create-collection"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <BiSolidCollection className="text-sm" />{" "}
                                  Create Collection
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/create-art"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex gap-2 items-center">
                                  <AiFillPicture className="text-sm" /> Create
                                  Art
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={handleClick}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login / Register
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 bg-gray-900">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
