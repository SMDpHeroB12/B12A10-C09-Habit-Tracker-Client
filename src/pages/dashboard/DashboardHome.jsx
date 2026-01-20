import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user, role } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [adminStats, setAdminStats] = useState(null);
  const [myHabits, setMyHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // NOTE: install once -> npm i recharts
  // If you don't want charts, tell me and I’ll make a no-library version.

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        if (role === "admin") {
          const res = await fetch(
            `${API_URL}/admin/stats?adminEmail=${encodeURIComponent(user?.email || "")}`,
          );
          const data = await res.json();
          if (data.success) setAdminStats(data.stats);
        } else {
          const res = await fetch(
            `${API_URL}/habits?email=${encodeURIComponent(user?.email || "")}`,
          );
          const data = await res.json();
          if (data.success) setMyHabits(data.habits || []);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.email && role) load();
  }, [API_URL, role, user?.email]);

  const chartData = useMemo(() => {
    if (role === "admin") {
      return (adminStats?.categoryAgg || [])
        .filter((x) => x._id)
        .map((x) => ({ name: x._id, count: x.count }));
    }

    // user chart: category distribution from own habits
    const map = new Map();
    for (const h of myHabits) {
      const key = h.category || "Unknown";
      map.set(key, (map.get(key) || 0) + 1);
    }
    return [...map.entries()].map(([name, count]) => ({ name, count }));
  }, [adminStats, myHabits, role]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Dashboard Overview</h2>

      {/* Cards */}
      {role === "admin" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Total Users</p>
              <p className="text-3xl font-bold">
                {adminStats?.totalUsers ?? 0}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Total Habits</p>
              <p className="text-3xl font-bold">
                {adminStats?.totalHabits ?? 0}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Public Habits</p>
              <p className="text-3xl font-bold">
                {adminStats?.publicHabits ?? 0}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Featured Habits</p>
              <p className="text-3xl font-bold">
                {adminStats?.featuredHabits ?? 0}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">My Total Habits</p>
              <p className="text-3xl font-bold">{myHabits.length}</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Public Habits</p>
              <p className="text-3xl font-bold">
                {myHabits.filter((h) => h.isPublic).length}
              </p>
            </div>
          </div>
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <p className="text-sm opacity-70">Featured Habits</p>
              <p className="text-3xl font-bold">
                {myHabits.filter((h) => h.isFeatured).length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="font-semibold mb-3">Habits by Category</h3>
          {chartData.length === 0 ? (
            <p className="opacity-70">No data to display</p>
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
