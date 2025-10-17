import SideBar from "../components/SideBar";
import { useItemStore } from "../store/useItemsStore";
import { useEffect } from "react";
const Dashboard = () => {
  const { items, loading, error, getItems } = useItemStore();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="flex">
        <SideBar />

        <div className="h-screen ml-10 mt-18 w-full md:mt-0 md:ml-0 md:p-12 ">
          <div className=" flex flex-col ">
            <h1 className="font-light text-2xl md:text-4xl  lg:text-5xl text-gray-500 ">
              Hello,
              <span className="font-bold text-2xl md:text-4xl lg:text-5xl text-black ">
                {` ${storedUser.name}`}
              </span>{" "}
              <span className="text-sm font-medium">{storedUser.role}</span>
            </h1>
          </div>
          <div className="grid grid-cols-2 items-center justify-center">
            <div className="bg-red-300 size-50 rounded-md">
              <h3>Total Items</h3>
              <h5>{items.length} </h5>
            </div>
            <div className="bg-red-300 size-50 rounded-md">
              <h3>Total Items</h3>
              <h5>{items.length} </h5>
            </div>
            <div className="bg-red-300 size-50 rounded-md">
              <h3>Total Items</h3>
              <h5>{items.length} </h5>
            </div>
            <div className="bg-red-300 size-50 rounded-md">
              <h3>Total Items</h3>
              <h5>{items.length} </h5>
            </div>
            <div className="bg-red-300 size-50 rounded-md">
              <h3>Total Items</h3>
              <h5>{items.length} </h5>
            </div>
          </div>
        </div>

        {/* <div>
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <h1>{item.name}</h1>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
