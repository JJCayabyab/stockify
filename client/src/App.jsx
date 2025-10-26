import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import Inventory from "./pages/Inventory";
import Logs from "./pages/Logs";
import AddUser from "./pages/AddUser";
function App() {
  const { token } = useAuthStore();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
