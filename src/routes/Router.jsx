import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AddHabit from "../pages/AddHabit";
import MyHabits from "../pages/MyHabits";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import HabitDetails from "../pages/HabitDetails";
import BrowsePublicHabits from "../pages/BrowsePublicHabits";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Profile from "../pages/Profile";

// ✅ Dashboard (role based)
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";

import DashboardHome from "../pages/dashboard/DashboardHome";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageHabits from "../pages/dashboard/ManageHabits";
import DashboardProfile from "../pages/dashboard/DashboardProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/habit/:id", element: <HabitDetails /> },

      {
        path: "/add-habit",
        element: (
          <ProtectedRoute>
            <AddHabit />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-habits",
        element: (
          <ProtectedRoute>
            <MyHabits />
          </ProtectedRoute>
        ),
      },

      { path: "/browse", element: <BrowsePublicHabits /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ✅ Dashboard routes (separate layout)
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      { path: "user", element: <UserDashboard /> },
      { path: "profile", element: <DashboardProfile /> },

      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-habits",
        element: (
          <AdminRoute>
            <ManageHabits />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
