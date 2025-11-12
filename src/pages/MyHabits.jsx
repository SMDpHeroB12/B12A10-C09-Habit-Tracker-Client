import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal control
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  // Load user's habits
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${import.meta.env.VITE_API_URL}/habits?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHabits(data.habits);
        else toast.error("Failed to load habits");
      })
      .catch(() => toast.error("Error loading habits"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Delete habit
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Habit deleted successfully.", "success");
        setHabits(habits.filter((h) => h._id !== id));
      } else toast.error("Failed to delete habit");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    }
  };

  // Mark Complete
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Habit marked as complete!");
        setHabits((prev) =>
          prev.map((h) => (h._id === id ? { ...h, completed: true } : h))
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark complete");
    }
  };

  // Open modal with habit
  const openModal = (habit) => {
    setSelectedHabit(habit);
    setImageUrl(habit.image || "");
    setShowModal(true);
  };

  // Upload new image (optional)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();

    if (data.success) {
      setImageUrl(data.data.display_url);
      Swal.fire("Success!", "Image uploaded successfully", "success");
    } else toast.error("Image upload failed!");
  };

  // Submit modal update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      image: imageUrl,
      userName: user.displayName,
      email: user.email,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/habits/${selectedHabit._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedHabit),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Habit updated successfully!");
        setHabits((prev) =>
          prev.map((h) =>
            h._id === selectedHabit._id ? { ...h, ...updatedHabit } : h
          )
        );
        setShowModal(false);
      } else {
        toast.error("Failed to update habit");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10 text-lg font-semibold">
        Loading habits...
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Habits</h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">
          No habits found. Try adding one!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300-gray-300 rounded-lg shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border border-gray-300">Title</th>
                <th className="p-3 border border-gray-300">Category</th>
                <th className="p-3 border border-gray-300">Reminder</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{habit.title}</td>
                  <td className="border border-gray-300 p-2">
                    {habit.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {habit.reminderTime}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {habit.completed ? (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    ) : (
                      <span className="text-orange-500 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-3 ">
                    <div className="flex gap-2 ">
                      <button
                        onClick={() => openModal(habit)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      {!habit.completed && (
                        <button
                          onClick={() => handleComplete(habit._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showModal && selectedHabit && (
        <div className="fixed inset-0 bg-[#0000005e]  flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-[400px]"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Update Habit
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="block mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedHabit.title}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedHabit.description}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Category</label>
                  <select
                    name="category"
                    defaultValue={selectedHabit.category}
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option>Morning</option>
                    <option>Work</option>
                    <option>Fitness</option>
                    <option>Evening</option>
                    <option>Study</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    name="reminderTime"
                    defaultValue={selectedHabit.reminderTime}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">
                    Upload New Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="preview"
                      className="w-32 mt-2 rounded"
                    />
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold">User Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {updating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyHabits;
