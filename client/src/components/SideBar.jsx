import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/stockify-logo.svg";
import { LogOut, LayoutDashboard, PackageOpen } from "lucide-react";

const SideBar = () => {
  const { token, user, logout } = useAuthStore();
  const role = user.role;

  try {
    console.log(user);
  } catch (error) {
    if (!token) {
      return <div>Unauthorized Access</div>;
    }
  }

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-900 w-56 text-white p-3">
      {/* Top Section */}
      <div>
        <div className="flex items-center mb-8">
          <img src={logo} alt="stockify-logo" className="size-18" />
          <h1 className="text-2xl font-bold ml-2">Stockify</h1>
        </div>

        <NavLink
          to="/dashboard"
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
          className={({ isActive }) =>
            `flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold cursor-pointer transition ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <PackageOpen />
          <h4>Inventory</h4>
        </NavLink>

        {role === "admin" && (
          <div className="flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold hover:bg-gray-700 cursor-pointer">
            <h4>Logs</h4>
          </div>
        )}
      </div>

      {/* Bottom Section (Logout) */}
      <div>
        <Link
          className="flex gap-2 text-md items-center m-3 p-2 rounded-md font-semibold hover:bg-gray-700"
          to="/login"
          onClick={logout}
        >
          <LogOut />
          <h4>Logout</h4>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
