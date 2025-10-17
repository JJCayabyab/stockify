import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import Inventory from "./pages/Inventory";
function App() {
  const { token, loading } = useAuthStore();


  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      
      </Routes>
    </>
  );
}

export default App;
