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
        setMenuOpen(false);
        console.log("User logged out");
      })
      .catch((error) => console.error(error));
  };

  const closeMobileMenu = () => setMenuOpen(false);

  const publicLinks = (
    <>
      <li onClick={closeMobileMenu}>
        <MyLink to={"/"}>Home</MyLink>
      </li>
      <li onClick={closeMobileMenu}>
        <MyLink to={"/browse"}>Browse Public Habits</MyLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li onClick={closeMobileMenu}>
        <MyLink to={"/add-habit"}>Add Habit</MyLink>
      </li>
      <li onClick={closeMobileMenu}>
        <MyLink to={"/my-habits"}>My Habits</MyLink>
      </li>
    </>
  );

  return (
    <div className="shadow-sm bg-base-100 sticky top-0 z-50">
      <nav className="navbar sm:w-11/12 mx-auto">
        <div className="navbar-start w-2/3 lg:w-1/2">
          {/* Logo / Brand Name */}
          <img className="h-10 mr-2" src={logo} alt="Habit Tracker Logo" />
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-2xl font-bold text-primary"
          >
            Habit Tracker
          </Link>
        </div>

        {/* For Large Screen */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Right Side (Auth) */}
        <div className="navbar-end w-1/3 lg:w-1/2 flex justify-end items-center ">
          {!user ? (
            <div className="space-x-2 flex ">
              <Link
                to="/login"
                className="btn btn-outline btn-sm hidden lg:inline-flex"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-sm hidden lg:inline-flex"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                aria-label="Open profile menu"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 shadow"
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

                {/* Advanced menu items */}
                <li onClick={closeMobileMenu}>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={closeMobileMenu}>
                  <Link to="/dashboard">Dashboard Home</Link>
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
          <div className="lg:hidden ml-2 ">
            <button
              className="btn btn-ghost"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-base-100 shadow-lg lg:hidden ">
            <ul className="menu p-3 w-full gap-2">
              {publicLinks}
              {user && privateLinks}

              <div className="divider my-2 "></div>

              {!user ? (
                <>
                  <li onClick={closeMobileMenu}>
                    <Link to="/login" className="btn btn-neutral btn-outline">
                      Login
                    </Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/signup" className="btn btn-primary ">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={closeMobileMenu}>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li onClick={closeMobileMenu}>
                    <Link to="/dashboard">Dashboard Home</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-error btn-outline btn-soft"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
