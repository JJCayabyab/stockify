import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useLogsStore } from "../store/useLogsStore";

const Logs = () => {
  const { logsLoading, logs, logsError, getLogs } = useLogsStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLogs = async () => await getLogs();
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    return searchQuery === ""
      ? true
      : log.item_name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-56 p-5 sm:p-10 mt-15 md:mt-5">
        <h1 className="text-2xl font-semibold sm:text-3xl lg:text-5xl text-gray-700">
          Logs
        </h1>

        {/** Loading */}

        {/*Search Bar*/}
        <div className="mt-8 w-full max-w-3xl mx-auto flex gap-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search a log based on item name..."
          />
        </div>
        {/*  Table Section */}
        <div className="overflow-x-auto">
          {logsLoading && (
            <div className="mt-2 flex  justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          )}
          <table className="w-full mt-8 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Performed By
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No logs found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {log.created_at}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {log.item_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 ">
                      {log.log_type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {log.performed_by}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Logs;
