import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MyLink from "./MyLink";
import logo from "/vite.svg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => console.error(error));
  };

  const MyLinks = (
    <>
      <li>
        <MyLink to={"/"} className="">
          Home
        </MyLink>
      </li>
      <li>
        <MyLink to={"/add-habit"} className="">
          Add Habit
        </MyLink>
      </li>
      <li>
        <MyLink to={"/my-habits"} className="">
          My Habits
        </MyLink>
      </li>
      <li>
        <MyLink to={"/browse"} className="">
          Browse Public Habits
        </MyLink>
      </li>
    </>
  );

  return (
    <div className=" shadow-sm">
      <div className="navbar bg-base-100 sticky top-0 z-50 w-11/12 mx-auto">
        <div className="navbar-start">
          {/* Logo / Brand Name */}
          <img className="h-10 mr-2" src={logo} alt="" />
          <Link to="/" className="text-2xl font-bold text-primary">
            Habit Tracker
          </Link>
        </div>

        {/* For Large Screen */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{MyLinks}</ul>
        </div>

        {/* Right Side (Auth) */}
        <div className="navbar-end">
          {!user ? (
            <div className="space-x-2 flex">
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Signup
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                    }
                    alt="userAvatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow"
              >
                <li>
                  <span className="font-semibold">
                    {user?.displayName || "Anonymous"}
                  </span>
                </li>
                <li>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* For Mobile */}
          <div className="lg:hidden ml-2">
            <button
              className="btn btn-ghost"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-base-100 shadow-lg lg:hidden">
            <ul className="menu p-3">{MyLinks}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
