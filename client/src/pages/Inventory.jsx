import React, { use } from "react";
import SideBar from "../components/SideBar";

const Inventory = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    <div>Unauthorized Access</div>;
  }
  return (
    <>
      <div className="flex">
        <SideBar />
        <div>Inventory</div>
      </div>
    </>
  );
};

export default Inventory;
