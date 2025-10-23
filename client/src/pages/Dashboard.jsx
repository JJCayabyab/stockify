import SideBar from "../components/SideBar";
import { useItemStore } from "../store/useItemsStore";
import { useEffect } from "react";
import { useUsersStore } from "../store/useUsersStore";
import { useAuthStore } from "../store/useAuthStore";
import { useLogsStore } from "../store/useLogsStore";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const { getItems, itemsCount, getItemsCount, itemsLoading } = useItemStore();
  const { userStats, getUsersCount, usersLoading } = useUsersStore();
  const { user } = useAuthStore();
  const { logsCount, getLogsCount, logsLoading } = useLogsStore();

  //fetch data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.allSettled([
          getItems(),
          getUsersCount(),
          getItemsCount(),
          getLogsCount(),
        ]);

        // Check which ones failed
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`Request ${index} failed:`, result.reason);
          }
        });
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 md:ml-56 p-5 sm:p-10 mt-15 md:mt-5">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-5xl text-gray-700">
          <span className="font-light">Hello, </span>
          {user?.name}{" "}
        </h1>
        
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {/* Users Card */}
          <div className="flex flex-col items-center justify-center bg-amber-200 rounded-md p-6">
            <h2 className="text-sm font-semibold text-gray-700">Total Users</h2>
            {usersLoading ? (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
              </div>
            ) : (
              <h4 className="text-3xl font-bold mt-2">{userStats.totalUsers}</h4>
            )}
          </div>

          {/* Items Card */}
          <div className="flex flex-col items-center justify-center bg-blue-200 rounded-md p-6">
            <h2 className="text-sm font-semibold text-gray-700">Total Items</h2>
            {itemsLoading ? (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <h4 className="text-3xl font-bold mt-2">{itemsCount.totalItems}</h4>
            )}
          </div>

          {/* Logs Card */}
          <div className="flex flex-col items-center justify-center bg-red-200 rounded-md p-6">
            <h2 className="text-sm font-semibold text-gray-700">Total Logs</h2>
            {logsLoading ? (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
              </div>
            ) : (
              <h4 className="text-3xl font-bold mt-2">{logsCount}</h4>
            )}
          </div>

          {/* Active Users Card */}
          <div className="flex flex-col items-center justify-center bg-green-200 rounded-md p-6">
            <h2 className="text-sm font-semibold text-gray-700">Active Users</h2>
            {usersLoading ? (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              </div>
            ) : (
              <h4 className="text-3xl font-bold mt-2">{userStats.activeUsers || 0}</h4>
            )}
          </div>
        </div>

        <div className="w-full mt-10 bg-white rounded-lg shadow-md p-4 sm:p-6">
          <BarChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;