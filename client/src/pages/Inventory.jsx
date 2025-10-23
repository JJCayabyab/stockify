import { Table } from "lucide-react";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useItemStore } from "../store/useItemsStore";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { itemsLoading, itemsError, items,getItems } = useItemStore();

  useEffect(()=>{
    const fetchAll = async () => {
      
    }
  },[])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-56 p-5 sm:p-10 mt-15 md:mt-5">
        <h1 className="text-2xl font-semibold sm:text-3xl lg:text-5xl text-gray-700">
          Inventory
        </h1>
        {/* Search Bar */}
        <div className="mt-8 w-full max-w-3xl mx-auto flex gap-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Search an item..."
          />
          <button className="bg-blue-700 rounded-sm text-white w-30 text-center hover:bg-blue-400">
            Add Item
          </button>
        </div>
        {/*Table */}
        <Table></Table>
      </main>
    </div>
  );
};

export default Inventory;
