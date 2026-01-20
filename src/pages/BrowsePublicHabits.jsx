import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import SkeletonHabitCard from "../components/SkeletonHabitCard";
import NoData from "../components/NoData";

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState("All"); // ✅ 2nd filter
  const [sortBy, setSortBy] = useState("newest"); // ✅ sorting
  const [loading, setLoading] = useState(true);

  //  pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const API_URL = import.meta.env.VITE_API_URL;

  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];
  const dateRanges = [
    { label: "All time", value: "All" },
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
  ];

  // Fetch Public Habits
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/habits/public`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHabits(data.habits || []);
        } else {
          toast.error("Failed to load public habits");
        }
      })
      .catch(() => toast.error("Error loading habits"))
      .finally(() => setLoading(false));
  }, [API_URL]);

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

  // ✅ all in one: search + filter + sort
  const processed = useMemo(() => {
    let results = [...habits];

    // Filter: category
    if (category !== "All") {
      results = results.filter((h) => h.category === category);
    }

    // Filter: date range
    if (dateRange !== "All") {
      const days = Number(dateRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      results = results.filter((h) => {
        if (!h.createdAt) return false;
        const created = new Date(h.createdAt);
        return !Number.isNaN(created.getTime()) && created >= cutoff;
      });
    }

    // Search
    const keyword = search.trim().toLowerCase();
    if (keyword) {
      results = results.filter(
        (h) =>
          h.title?.toLowerCase().includes(keyword) ||
          h.description?.toLowerCase().includes(keyword) ||
          h.userName?.toLowerCase().includes(keyword),
      );
    }

    // Sort
    if (sortBy === "newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "title-az") {
      results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "title-za") {
      results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    return results;
  }, [habits, category, dateRange, search, sortBy]);

  //  pagination derived
  const totalItems = processed.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  // keep page safe after filtering
  useEffect(() => {
    setPage(1);
  }, [search, category, dateRange, sortBy, perPage]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return processed.slice(start, start + perPage);
  }, [processed, page, perPage]);

  const showingFrom = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(page * perPage, totalItems);

  const goToPage = (p) => {
    const safe = Math.min(Math.max(1, p), totalPages);
    setPage(safe);
  };

  return (
    <motion.div
      className="w-11/12 mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">
        Browse Public Habits
      </h2>

      {/* Showing count */}
      <p className="text-center text-sm text-base-content/70 mb-6">
        {loading ? (
          "Loading habits..."
        ) : (
          <>
            Showing <span className="font-semibold">{showingFrom}</span>-
            <span className="font-semibold">{showingTo}</span> of{" "}
            <span className="font-semibold">{totalItems}</span> habits
          </>
        )}
      </p>

      {/*  Filters + Sorting Row */}
      <div className="max-w-6xl  mx-auto">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 place-items-center mb-6">
          {/* Search */}
          <div className="w-full mx-auto flex justify-center">
            <input
              type="text"
              placeholder="🔎 Search habits..."
              className="input w-full "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-tooltip-id="search-tip"
            />
            <Tooltip
              id="search-tip"
              content="Search by title, description, or author"
            />
          </div>
          {/* Category */}
          <select
            className="select w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-tooltip-id="cat-filter-tip"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
          <Tooltip id="cat-filter-tip" content="Filter by habit category" />

          {/* Date range */}
          <select
            className="select w-full"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            data-tooltip-id="date-filter-tip"
          >
            {dateRanges.map((d) => (
              <option key={d.value} value={d.value}>
                Date: {d.label}
              </option>
            ))}
          </select>
          <Tooltip
            id="date-filter-tip"
            content="Filter by created date range"
          />

          {/* Sorting */}
          <select
            className="select w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            data-tooltip-id="sort-tip"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="title-az">Sort: Title A → Z</option>
            <option value="title-za">Sort: Title Z → A</option>
          </select>
          <Tooltip id="sort-tip" content="Sort results" />
        </div>
      </div>

      {/* Reset + Per Page */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
        <select
          className="select select-bordered select-sm"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          data-tooltip-id="perpage-tip"
        >
          <option value={8}>8 / page</option>
          <option value={12}>12 / page</option>
          <option value={16}>16 / page</option>
        </select>
        <Tooltip id="perpage-tip" content="Change cards per page" />

        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
            setDateRange("All");
            setSortBy("newest");
            setPage(1);
          }}
          className="btn btn-outline btn-primary btn-sm"
          data-tooltip-id="reset-tip"
        >
          Reset
        </button>
        <Tooltip id="reset-tip" content="Clear search, filters, and sorting" />
      </div>

      {/* Habits Section */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonHabitCard key={i} />
          ))}
        </div>
      ) : processed.length === 0 ? (
        <motion.div
          className="text-center text-gray-500 mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <NoData />
          No habits found. Try a different search or filter.
        </motion.div>
      ) : (
        <>
          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            layout
          >
            {pageItems.map((habit) => (
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

          {/* ✅ Pagination */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-10">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>

            <div className="join">
              {Array.from({ length: totalPages })
                .slice(0, 7)
                .map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`join-item btn btn-sm ${
                        page === pageNum ? "btn-primary" : "btn-outline"
                      }`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

              {totalPages > 7 && (
                <>
                  <button className="join-item btn btn-sm btn-disabled">
                    ...
                  </button>
                  <button
                    className={`join-item btn btn-sm ${
                      page === totalPages ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => goToPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default BrowsePublicHabits;
