import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/habits?email=${encodeURIComponent(user.email)}`,
        );
        const data = await res.json();
        if (data?.success) setHabits(data.habits || []);
        else setHabits([]);
      } catch (e) {
        console.error(e);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API_URL, user?.email]);

  const stats = useMemo(() => {
    const total = habits.length;
    const publicCount = habits.filter((h) => h.isPublic).length;
    const featuredCount = habits.filter((h) => h.isFeatured).length;

    // completed today count
    const today = new Date().toISOString().split("T")[0];
    const completedToday = habits.filter((h) =>
      (h.completionHistory || []).includes(today),
    ).length;

    // most used category
    const map = new Map();
    for (const h of habits) {
      const key = h.category || "Unknown";
      map.set(key, (map.get(key) || 0) + 1);
    }
    let topCategory = "N/A";
    let topCount = 0;
    for (const [k, v] of map.entries()) {
      if (v > topCount) {
        topCount = v;
        topCategory = k;
      }
    }

    return { total, publicCount, featuredCount, completedToday, topCategory };
  }, [habits]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">User Dashboard</h2>
          <p className="opacity-70 text-sm">
            Welcome, {user?.displayName || "User"} 👋
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/add-habit" className="btn btn-primary btn-sm">
            + Add Habit
          </Link>
          <Link to="/my-habits" className="btn btn-outline btn-sm">
            My Habits
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Total Habits</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Completed Today</p>
            <p className="text-3xl font-bold">{stats.completedToday}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Public</p>
            <p className="text-3xl font-bold">{stats.publicCount}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Featured</p>
            <p className="text-3xl font-bold">{stats.featuredCount}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Top Category</p>
            <p className="text-xl font-bold">{stats.topCategory}</p>
          </div>
        </div>
      </div>

      {/* Recent Habits */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-lg">Recent Habits</h3>
            <Link to="/my-habits" className="link link-primary text-sm">
              View all →
            </Link>
          </div>

          {habits.length === 0 ? (
            <p className="opacity-70">
              No habits yet. Create your first habit!
            </p>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Visibility</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.slice(0, 6).map((h, idx) => (
                    <tr key={h._id}>
                      <td>{idx + 1}</td>
                      <td className="font-semibold">{h.title}</td>
                      <td>{h.category || "—"}</td>
                      <td>{formatDate(h.createdAt)}</td>
                      <td className="space-x-2">
                        {h.isPublic && (
                          <span className="badge badge-success badge-outline">
                            Public
                          </span>
                        )}
                        {h.isFeatured && (
                          <span className="badge badge-warning badge-outline">
                            Featured
                          </span>
                        )}
                        {!h.isPublic && !h.isFeatured && (
                          <span className="badge badge-ghost">Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
