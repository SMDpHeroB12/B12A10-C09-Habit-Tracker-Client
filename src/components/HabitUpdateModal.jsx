import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";

const HabitUpdateModal = ({
  user,
  habit,
  API_URL,
  IMGBB_KEY,
  onClose,
  onUpdate,
}) => {
  const [imageUrl, setImageUrl] = useState(habit.image || "");
  const [updating, setUpdating] = useState(false);

  // image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    if (!IMGBB_KEY) {
      toast.error("ImgBB key not found in env.");
      return;
    }

    try {
      const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.display_url);
        Swal.fire("Success!", "Image uploaded successfully", "success");
      } else {
        console.error("ImgBB error:", data);
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    }
  };

  // update handler
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
      userName: user?.displayName || habit.userName,
      userEmail: user?.email || habit.userEmail,
    };

    try {
      const res = await fetch(`${API_URL}/habits/${habit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHabit),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Habit updated successfully!");
        onUpdate({ ...habit, ...updatedHabit });
        onClose();
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

  return (
    <div className="fixed inset-0 bg-[#0000005e] flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[400px]"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Update Habit</h3>

          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={habit.title}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={habit.description}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <select
                name="category"
                defaultValue={habit.category}
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
              <label className="block mb-1 font-semibold">Reminder Time</label>
              <input
                type="time"
                name="reminderTime"
                defaultValue={habit.reminderTime}
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
                className="w-full border bg-[#99c8e2]  hover:bg-blue-600  border-gray-300 p-2 rounded"
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
                onClick={onClose}
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
  );
};

export default HabitUpdateModal;
