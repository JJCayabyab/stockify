import React, { use } from "react";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>Dashboard</div>
      </div>
    </>
  );
};

export default Dashboard;
