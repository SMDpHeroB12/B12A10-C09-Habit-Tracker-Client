import { createBrowserRouter } from "react-router";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/habit/:id",
        element: <HabitDetails />,
      },
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

      {
        path: "/browse",
        element: <BrowsePublicHabits />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
