import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Dashboard
        </h1>
        <p className="mt-2 text-base-content/70">
          Welcome back,{" "}
          <span className="font-semibold">
            {user?.displayName || "Habit Builder"}
          </span>
          .
        </p>

        {/* Overview cards (simple now, dynamic later) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-sm text-base-content/70">Quick Action</h2>
            <p className="text-xl font-bold mt-2">Create a new habit</p>
            <Link to="/add-habit" className="btn btn-primary btn-sm mt-4">
              Add Habit
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-sm text-base-content/70">Manage</h2>
            <p className="text-xl font-bold mt-2">View your habits</p>
            <Link to="/my-habits" className="btn btn-outline btn-sm mt-4">
              My Habits
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-sm text-base-content/70">Profile</h2>
            <p className="text-xl font-bold mt-2">Update your info</p>
            <Link to="/profile" className="btn btn-ghost btn-sm mt-4">
              Go to Profile
            </Link>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-xl bg-base-200 shadow-md">
          <h2 className="text-xl font-semibold">Explore The Website</h2>
          <ul className="list-disc ml-5 mt-2 text-base-content/70 space-y-1">
            <li>Add Habits</li>
            <li>Manage Habits</li>
            <li>Search For Other Users Habits</li>
            <li>Contact Us for Helps</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
