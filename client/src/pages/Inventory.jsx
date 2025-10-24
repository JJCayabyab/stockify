import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useItemStore } from "../store/useItemsStore";
import { SquarePen, Trash2 } from "lucide-react";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null); // "added" | "updated" | "deleted" | "error" | null
  const { itemsLoading, itemsError, items, getItems, updateItem, deleteItem } =
    useItemStore();

  const [updatedItem, setUpdatedItem] = useState({
    id: null,
    name: "",
    category: "",
    quantity: null,
    supplier: "",
    price: null,
  });

  useEffect(() => {
    const fetchItems = async () => await getItems();
    fetchItems();
  }, [getItems]);

  //  Reusable Toast Function
  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(updatedItem.id, updatedItem);
      document.getElementById("my_modal_2").close();
      showToast("updated");
    } catch (error) {
      showToast("error");
    }
  };

  //for item id to be deleted
  const [selectedItemId, setSelectedItemId] = useState(null);

  //delete function
  const showDeleteModal = (id) => {
    setSelectedItemId(id);
    document.getElementById("my_modal_1").showModal();
  };
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles the deletion of an item.
   * Closes the delete modal and shows a toast with the result of the deletion.
   * If an error occurs, shows a toast with the error message.
   */
  /*******  74f05d16-2161-415c-9d69-1380efb9ad0c  *******/
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteItem(selectedItemId);
      document.getElementById("my_modal_1").close();
      showToast("deleted");
    } catch (error) {
      showToast("error");
    }
  };

  //filter items to display on table for search query
  const filteredItems = items.filter((item) =>
    searchQuery === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideBar />

      <main className="flex-1 flex flex-col md:ml-56 p-5 sm:p-10 mt-15 md:mt-5">
        {/* ✅ Toast */}
        {toast && (
          <div className="toast toast-center toast-top z-50">
            {toast === "updated" && (
              <div className="alert alert-success">
                <span>Item updated successfully!</span>
              </div>
            )}
            {toast === "added" && (
              <div className="alert alert-success">
                <span>Item added successfully!</span>
              </div>
            )}
            {toast === "deleted" && (
              <div className="alert alert-error">
                <span>Item deleted successfully!</span>
              </div>
            )}
            {toast === "error" && (
              <div className="alert alert-error">
                <span>Something went wrong. Try again.</span>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal*/}
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box flex flex-col items-center justify-center text-center space-y-4">
            {/* Icon + Text */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <Trash2 className="text-red-700 w-12 h-12" />
              <h1 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this item?
              </h1>
            </div>

            {/* Buttons */}
            <form
              className="w-full flex justify-center gap-4 pt-4"
              onSubmit={handleDelete}
            >
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                No
              </button>

              <button
                type="submit"
                className="btn bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Yes
              </button>
            </form>
          </div>
        </dialog>

        {/*  Edit Modal */}
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Item</h3>
            <form
              className="w-full max-w-md p-4 space-y-6"
              onSubmit={handleEditSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  value={updatedItem.name}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, name: e.target.value })
                  }
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Edit item name"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={updatedItem.category}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, category: e.target.value })
                  }
                >
                  <option value=""></option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Sports">Sports</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Pet Supplies">Pet Supplies</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="supplier"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Supplier
                </label>
                <input
                  id="supplier"
                  type="text"
                  value={updatedItem.supplier}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, supplier: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Edit supplier name"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={updatedItem.quantity ?? ""}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, quantity: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Edit quantity"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={updatedItem.price ?? ""}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  placeholder="Edit price"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUpdatedItem({
                      id: null,
                      name: "",
                      category: "",
                      quantity: null,
                      supplier: "",
                      price: null,
                    });
                    document.getElementById("my_modal_2").close();
                  }}
                  className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/*  Table Section */}
        <h1 className="text-2xl font-semibold sm:text-3xl lg:text-5xl text-gray-700">
          Inventory
        </h1>

        <div className="mt-8 w-full max-w-3xl mx-auto flex gap-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search an item..."
          />
          <button
            className="font-semibold bg-blue-700 rounded-sm text-white w-30 text-center hover:bg-blue-400"
            onClick={() => showToast("added")} // 🔹 temporary test for add
          >
            Add Item
          </button>
        </div>

        {/*Show error message that came from useItemStore */}
        {itemsError && (
          <div className="text-center text-red-500 mt-4">{itemsError}</div>
        )}

        {itemsLoading ? (
          <div className="mt-2 flex justify-center items-center h-[300px]">
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
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No items found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.id}
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
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm flex space-x-2">
                        <SquarePen
                          title="Edit item"
                          className="text-blue-600 cursor-pointer"
                          onClick={() => {
                            setUpdatedItem({
                              id: item.id,
                              name: item.name,
                              category: item.category,
                              supplier: item.supplier,
                              quantity: item.quantity,
                              price: item.price,
                            });
                            document.getElementById("my_modal_2").showModal();
                          }}
                        />
                        <Trash2
                          title="Delete item"
                          className="text-red-600 cursor-pointer"
                          onClick={() => showDeleteModal(item.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
