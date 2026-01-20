import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import SkeletonHabitCard from "../components/SkeletonHabitCard";

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

  // Fetch Public Habits
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/habits/public`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHabits(data.habits);
          setFiltered(data.habits);
        } else {
          toast.error("Failed to load public habits");
        }
      })
      .catch(() => toast.error("Error loading habits"))
      .finally(() => setLoading(false));
  }, [API_URL]);

  // Dynamic Search & Filter
  useEffect(() => {
    let results = [...habits];
    if (category !== "All") {
      results = results.filter((h) => h.category === category);
    }
    if (search.trim()) {
      const keyword = search.toLowerCase();
      results = results.filter(
        (h) =>
          h.title.toLowerCase().includes(keyword) ||
          h.description?.toLowerCase().includes(keyword),
      );
    }
    setFiltered(results);
  }, [search, category, habits]);
  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <motion.div
      className="w-11/12 mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Browse Public Habits
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔎 Search habits..."
          className="input input-bordered w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-tooltip-id="search-tip"
        />
        <Tooltip id="search-tip" content="Search habits by title or keyword" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              category === cat
                ? "bg-primary text-white border-primary"
                : "bg-base-100 text-gray-700 border-gray-300 hover:bg-primary/10"
            }`}
            data-tooltip-id={`cat-${cat}`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
          }}
          className="btn btn-outline btn-sm"
          data-tooltip-id="reset-tip"
        >
          Reset Filters
        </button>
        <Tooltip id="reset-tip" content="Clear search and filters" />
      </div>

      {/* Habits Section */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonHabitCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          😔 No habits found. Try a different search or filter.
        </motion.p>
      ) : (
        // Habit Cards
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          {filtered.map((habit) => (
            <motion.div
              key={habit._id}
              layout
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <figure>
                <img
                  src={habit.image || "https://via.placeholder.com/300"}
                  alt={habit.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg flex items-center justify-between">
                  {habit.title}
                  <span
                    className="badge badge-outline"
                    data-tooltip-id={`cat-${habit._id}`}
                    data-tooltip-content={`Category: ${habit.category}`}
                  >
                    {habit.category}
                  </span>
                </h3>
                <Tooltip id={`cat-${habit._id}`} />
                <p className="text-sm text-gray-600 line-clamp-2">
                  {habit.description || "No description provided"}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  🗓️ Created: {formatDate(habit.createdAt)}
                </p>

                <div className="card-actions justify-between items-center mt-3">
                  <Link
                    to={`/habit/${habit._id}`}
                    className="btn btn-sm btn-primary"
                    data-tooltip-id={`view-${habit._id}`}
                    data-tooltip-content="View detailed habit info"
                  >
                    View Details
                  </Link>
                  <Tooltip id={`view-${habit._id}`} />
                  <span className="text-xs text-gray-400">
                    👤 {habit.userName || "Unknown"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BrowsePublicHabits;
