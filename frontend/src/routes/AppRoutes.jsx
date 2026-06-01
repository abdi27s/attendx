import { Route, Routes } from "react-router-dom";
import GuestLayout from "../layouts/guest/GuestLayout.jsx";
import Layout from "../layouts/Layout.jsx";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import Report from "../pages/Report.jsx";
import User from "../pages/User.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/users" element={<User />} />
          <Route path="/me" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<GuestLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
