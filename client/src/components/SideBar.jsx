import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/stockify-logo.svg";
import {
  LogOut,
  LayoutDashboard,
  PackageOpen,
  Menu,
  X,
  ScrollText,
  UserPlus,
} from "lucide-react";

const SideBar = () => {
  const { token, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const role = user?.role;

  try {
  } catch (error) {
    if (!token) {
      return <div>Unauthorized Access</div>;
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 h-screen bg-gray-900 text-white p-3 transition-all duration-300 z-40 overflow-y-auto ${
          isOpen ? "left-0" : "-left-56"
        } md:left-0 w-56 flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center mb-8">
            <img
              src={logo}
              alt="stockify-logo"
              className="size-12 md:size-18"
            />
            <h1 className="text-xl md:text-2xl font-bold ml-2">Stockify</h1>
          </div>

          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold cursor-pointer transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <LayoutDashboard />
            <h4>Dashboard</h4>
          </NavLink>

          <NavLink
            to="/inventory"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold cursor-pointer transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <PackageOpen />
            <h4>Inventory</h4>
          </NavLink>

          {role === "admin" ? (
            <NavLink
              to="/logs"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold cursor-pointer transition ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              <ScrollText />
              <h4>Logs</h4>
            </NavLink>
          ) : (
            <></>
          )}

          {role === "admin" ? (
            <NavLink
              to="/adduser"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold cursor-pointer transition ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              <UserPlus />
              <h4>Add User</h4>
            </NavLink>
          ) : (
            <></>
          )}
          <hr className="text-gray-400 border-t-2 font-semibold" />

          <Link
            className="flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold hover:bg-gray-700"
            to="/login"
            onClick={async () => {
              await logout();
              closeMenu();
            }}
          >
            <LogOut />
            <h4>Logout</h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
