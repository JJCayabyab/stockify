import SideBar from "../components/SideBar";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AddUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const { addUser, authError, authLoading } = useAuthStore();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addUser(user);
    if (result) {
      showToast();
      setUser({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideBar />
      {/* Toast */}
      {toast && (
        <div className="toast toast-center toast-top z-50">
          <div className="alert alert-success">
            <span>User added successfully!</span>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-56 p-5 sm:p-10 mt-15 md:mt-5">
        <h1 className="text-2xl font-semibold sm:text-3xl lg:text-5xl text-gray-700">
          Add User
        </h1>
        {/*Show error message that came from useAuthStore */}
        {authError && (
          <div className="text-center text-red-500 mt-4">{authError}</div>
        )}
        
        {authLoading && (
          <div className="mt-2 flex  justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        )}
        <div className="bg-white mt-10 rounded-2xl shadow-md mx-auto w-full">
          <form
            className="w-full max-w-md p-4 space-y-6 mx-auto"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                required
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                placeholder="Enter full name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                required
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                placeholder="Enter email address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                required
                id="role"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm pr-10"
                  placeholder="Min. 8 characters"
                  value={user.password}
                  minLength={8}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUser;
