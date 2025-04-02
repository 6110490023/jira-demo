import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
const AppRoutes = () => {
  return (
    <AlertProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AlertProvider>
  );
};

export default AppRoutes;