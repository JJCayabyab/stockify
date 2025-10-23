import { Table } from "lucide-react";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useItemStore } from "../store/useItemsStore";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { itemsLoading, itemsError, items, getItems } = useItemStore();

  useEffect(() => {
    const fetchItems = async () => {
      await getItems();
    };
    fetchItems();
  }, []);

  // //for testing
  // const testError = () => {
  //   useItemStore.setState({
  //     itemsError: "Test error: Something went wrong!",
  //     itemsLoading: true,
  //   });
  // };


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
          <button className=" font-semibold bg-blue-700 rounded-sm text-white w-30 text-center hover:bg-blue-400">
            Add Item
          </button>
        </div>
        {/*Table */}
        {itemsError && <div className="text-red-500">{itemsError}</div>}
        {itemsLoading ? (
          <div className="mt-2 flex justify-center items-center h-[300px] sm:h-[350px] lg:h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mt-8 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.item_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
