import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AddHabit from "../pages/AddHabit";
import BrowseHabits from "../pages/BrowseHabits";
import MyHabits from "../pages/MyHabits";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-habit",
        element: (
          <ProtectedRoute>
            <AddHabit></AddHabit>
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <ProtectedRoute>
            <MyHabits></MyHabits>
          </ProtectedRoute>
        ),
      },
      {
        path: "/browse",
        element: <BrowseHabits></BrowseHabits>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
]);

export default router;
