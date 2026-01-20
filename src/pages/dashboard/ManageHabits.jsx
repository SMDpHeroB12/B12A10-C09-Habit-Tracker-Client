import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const ManageHabits = () => {
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/admin/habits?adminEmail=${encodeURIComponent(user?.email || "")}`,
      );
      const data = await res.json();
      if (data.success) setHabits(data.habits || []);
      setLoading(false);
    };
    if (user?.email) load();
  }, [API_URL, user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this habit?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `${API_URL}/admin/habits/${id}?adminEmail=${encodeURIComponent(user?.email || "")}`,
      { method: "DELETE" },
    );
    const data = await res.json();

    if (data.success) {
      Swal.fire("Deleted!", "Habit deleted.", "success");
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } else {
      Swal.fire("Failed!", data.message || "Could not delete habit.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Manage Habits</h2>

      <div className="overflow-x-auto">
        <table className="table bg-base-200 rounded-lg">
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Public</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((h, idx) => (
              <tr key={h._id}>
                <td>{idx + 1}</td>
                <td className="font-semibold">{h.title}</td>
                <td className="text-xs">{h.userEmail || "—"}</td>
                <td>{h.isPublic ? "✅" : "—"}</td>
                <td>{h.isFeatured ? "⭐" : "—"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(h._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHabits;
