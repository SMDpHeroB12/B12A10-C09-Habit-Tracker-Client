import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/admin/stats?adminEmail=${encodeURIComponent(user.email)}`,
        );
        const data = await res.json();
        if (data?.success) setStats(data.stats);
        else setStats(null);
      } catch (e) {
        console.error(e);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API_URL, user?.email]);

  const topCategories = useMemo(() => {
    const arr = stats?.categoryAgg || [];
    return arr
      .filter((x) => x?._id)
      .slice(0, 6)
      .map((x) => ({ name: x._id, count: x.count }));
  }, [stats]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
          <p className="opacity-70">
            Couldn’t load admin stats. Make sure you are using the correct admin
            email and your server is deployed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
          <p className="opacity-70 text-sm">
            You have admin access ✅ ({user?.email})
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/dashboard/manage-users" className="btn btn-outline btn-sm">
            Manage Users
          </Link>
          <Link
            to="/dashboard/manage-habits"
            className="btn btn-primary btn-sm"
          >
            Manage Habits
          </Link>
        </div>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Total Users</p>
            <p className="text-3xl font-bold">{stats.totalUsers ?? 0}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Total Habits</p>
            <p className="text-3xl font-bold">{stats.totalHabits ?? 0}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Public Habits</p>
            <p className="text-3xl font-bold">{stats.publicHabits ?? 0}</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <p className="text-sm opacity-70">Featured Habits</p>
            <p className="text-3xl font-bold">{stats.featuredHabits ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="font-semibold text-lg">Top Categories</h3>

          {topCategories.length === 0 ? (
            <p className="opacity-70">No category data found.</p>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Category</th>
                    <th>Habits</th>
                  </tr>
                </thead>
                <tbody>
                  {topCategories.map((c, idx) => (
                    <tr key={c.name}>
                      <td>{idx + 1}</td>
                      <td className="font-semibold">{c.name}</td>
                      <td>{c.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge badge-outline">Admin Tools</span>
            <span className="badge badge-outline">User Management</span>
            <span className="badge badge-outline">Habit Moderation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
