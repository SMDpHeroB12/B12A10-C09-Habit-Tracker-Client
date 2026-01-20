import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const ManageUsers = () => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/admin/users?adminEmail=${encodeURIComponent(user?.email || "")}`,
      );
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
      setLoading(false);
    };
    if (user?.email) load();
  }, [API_URL, user?.email]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-lg">
          <thead>
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id || u.email}>
                <td>{idx + 1}</td>
                <td>{u.email}</td>
                <td>{u.name || "N/A"}</td>
                <td>
                  <span className="badge badge-outline">
                    {u.role || "user"}
                  </span>
                </td>
                <td>
                  {u.lastLoginAt
                    ? new Date(u.lastLoginAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
