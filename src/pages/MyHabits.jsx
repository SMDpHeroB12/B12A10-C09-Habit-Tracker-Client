import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import HabitUpdateModal from "../components/HabitUpdateModal";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

  // Fetch user's habits
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_URL}/habits?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHabits(data.habits || []);
        else toast.error("Failed to load habits");
      })
      .catch(() => toast.error("Error loading habits"))
      .finally(() => setLoading(false));
  }, [API_URL, user?.email]);

  // Calculate streak
  const calculateStreak = (history = []) => {
    if (!history.length) return 0;
    const sorted = [...history].sort().reverse();
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (prev - curr) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  // Delete Habit
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/habits/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Habit deleted successfully.", "success");
        setHabits((prev) => prev.filter((h) => h._id !== id));
      } else toast.error("Failed to delete habit");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    }
  };

  // Mark Complete
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/habits/${id}/complete`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Habit marked complete! ✅");
        const today = new Date().toISOString().split("T")[0];

        setHabits((prev) =>
          prev.map((h) =>
            h._id === id
              ? {
                  ...h,
                  completionHistory: [...(h.completionHistory || []), today],
                }
              : h,
          ),
        );
      } else {
        toast.error(data.message || "Already marked complete today!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const openModal = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  const handleHabitUpdate = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((h) => (h._id === updatedHabit._id ? updatedHabit : h)),
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (!habits.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">
          No habits found
        </h2>
        <Link to="/add-habit" className="btn btn-primary">
          + Add Habit
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        My Habits
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full bg-base-200 rounded-lg">
          <thead>
            <tr className="text-primary text-sm">
              <th>SL</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Streak</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {habits.map((habit, index) => {
              const streak = calculateStreak(habit.completionHistory);
              const completedToday = habit.completionHistory?.includes(
                new Date().toISOString().split("T")[0],
              );

              return (
                <tr key={habit._id} className="hover">
                  {/* SL No */}
                  <td>{index + 1}</td>

                  {/* Title + Badges */}
                  <td className="font-semibold">
                    {habit.title}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {habit.isPublic ? (
                        <span className="badge badge-success badge-outline badge-sm">
                          Public
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">
                          Private
                        </span>
                      )}

                      {habit.isFeatured && (
                        <span className="badge badge-warning badge-outline badge-sm">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>

                  <td>{habit.category}</td>

                  <td>
                    {completedToday ? (
                      <span className="text-green-600 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                    {streak > 0 && (
                      <span className="ml-2 text-orange-600">🔥 {streak}d</span>
                    )}
                  </td>

                  <td>{streak}</td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => openModal(habit)}
                      className="btn btn-outline btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleComplete(habit._id)}
                      disabled={completedToday}
                      className="btn btn-primary btn-sm disabled:opacity-50"
                    >
                      {completedToday ? "Done ✅" : "Mark Complete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedHabit && (
        <HabitUpdateModal
          user={user}
          habit={selectedHabit}
          API_URL={API_URL}
          IMGBB_KEY={IMGBB_KEY}
          onClose={() => {
            setShowModal(false);
            setSelectedHabit(null);
          }}
          onUpdate={handleHabitUpdate}
        />
      )}
    </div>
  );
};

export default MyHabits;
