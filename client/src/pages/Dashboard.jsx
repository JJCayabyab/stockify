import SideBar from "../components/SideBar";
import { useItemStore } from "../store/useItemsStore";
import { useEffect } from "react";
import { useUsersStore } from "../store/useUsersStore";

const Dashboard = () => {
  const { items, getItems } = useItemStore();
  const { userStats, getUsersCount } = useUsersStore();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getItems();
    getUsersCount();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-gray-600">
            Hello,{" "}
            <span className="font-bold text-black">
              {storedUser?.name || "User"}
            </span>{" "}
            <span className="block md:inline text-sm font-medium text-gray-500">
              {storedUser?.role}
            </span>
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-200 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Items
            </h3>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>

          <div className="bg-green-200 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Users
            </h3>
            <p className="text-2xl font-bold">{userStats.totalUsers}</p>
            <div className="mt-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Admins:</span>{" "}
                {userStats.totalAdmins}
              </p>
              <p>
                <span className="font-semibold">Staff:</span>{" "}
                {userStats.totalStaff}
              </p>
            </div>
          </div>

          <div className="bg-yellow-200 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Example Metric
            </h3>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
