import { Navigate, Outlet, Route, Routes } from "react-router";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Home from "../pages/Dashboard/Home";
import Event from "../pages/Dashboard/Event";
import Participant from "../pages/Dashboard/Participant";



// Protected Route 
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("acces_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Public Route
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("acces_token");
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

// AppRouter Component
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
     
      <Route path="/" element={<div>Welcome to the App</div>} />
      <Route element={<AuthLayout Title="Login to Your Account" />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
      </Route>
      

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="events" element={<Event />} />
          <Route path="events/:eventId/participants" element={<Participant/>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
