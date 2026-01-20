import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, role, logOut } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive ? "bg-primary text-white" : "hover:bg-base-200"
    }`;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40">
        <div className="flex-1">
          <label htmlFor="dash-drawer" className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <span className="text-xl font-bold text-primary ml-2">Dashboard</span>
        </div>

        <div className="flex-none">
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
                  alt="avatar"
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
                <span className="text-xs opacity-70">{user?.email}</span>
              </li>
              <div className="divider my-1" />
              <li>
                <NavLink to="/dashboard" className="justify-between">
                  Dashboard Home
                  <span className="badge badge-outline">{role || "user"}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <div className="divider my-1" />
              <li>
                <button onClick={logOut} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Drawer Layout */}
      <div className="drawer lg:drawer-open">
        <input id="dash-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-4 md:p-6">
          <Outlet />
        </div>

        <div className="drawer-side">
          <label htmlFor="dash-drawer" className="drawer-overlay"></label>

          <aside className="w-72 bg-base-200 min-h-full p-4">
            <div className="mb-4">
              <p className="text-sm opacity-70">Signed in as</p>
              <p className="font-semibold">
                {user?.displayName || "Anonymous"}
              </p>
              <p className="text-xs opacity-70">{user?.email}</p>
              <p className="mt-2 badge badge-primary badge-outline">
                {role || "user"}
              </p>
            </div>

            <div className="divider" />

            {/* USER MENU (min 2) */}
            <p className="text-xs font-semibold opacity-70 mb-2">User Menu</p>
            <nav className="space-y-1">
              <NavLink to="/dashboard" className={linkClass} end>
                Overview
              </NavLink>
              <NavLink to="/dashboard/user" className={linkClass}>
                My Summary
              </NavLink>
            </nav>

            {/* ADMIN MENU (min 3) */}
            {role === "admin" && (
              <>
                <div className="divider" />
                <p className="text-xs font-semibold opacity-70 mb-2">
                  Admin Menu
                </p>
                <nav className="space-y-1">
                  <NavLink to="/dashboard/admin" className={linkClass}>
                    Admin Overview
                  </NavLink>
                  <NavLink to="/dashboard/manage-users" className={linkClass}>
                    Manage Users
                  </NavLink>
                  <NavLink to="/dashboard/manage-habits" className={linkClass}>
                    Manage Habits
                  </NavLink>
                </nav>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
