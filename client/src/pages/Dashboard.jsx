import React, { use } from "react";
import SideBar from "../components/SideBar";
import { useItemStore } from "../store/useItemsStore";
const Dashboard = () => {
  const { items, loading, error } = useItemStore();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="flex">
        <SideBar />
        {loading && <LoadingSpinner />}
        <div className="p-16">
          <h1 className="font-light text-5xl text-gray-500 ">
            Hello,
            <span className="font-bold text-5xl text-black ">
              {` ${storedUser.name}`}
            </span>{" "}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
