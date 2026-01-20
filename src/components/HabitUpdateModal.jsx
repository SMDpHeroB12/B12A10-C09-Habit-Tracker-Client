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
  // ✅ support both legacy + new field
  const initialImages =
    Array.isArray(habit?.images) && habit.images.length
      ? habit.images
      : habit?.image
        ? [habit.image]
        : [];

  const [imageUrls, setImageUrls] = useState(initialImages);
  const [updating, setUpdating] = useState(false);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    if (!IMGBB_KEY) {
      toast.error("ImgBB key not found in env.");
      return null;
    }

    try {
      const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) return data.data.display_url;

      console.error("ImgBB error:", data);
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // ✅ handle multiple image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (imageUrls.length + files.length > 5) {
      toast.error("Max 5 images allowed.");
      e.target.value = "";
      return;
    }

    try {
      setUpdating(true);

      const uploaded = [];
      for (const file of files) {
        const url = await uploadToImgBB(file);
        if (!url) {
          toast.error("One image upload failed. Try again.");
          setUpdating(false);
          e.target.value = "";
          return;
        }
        uploaded.push(url);
      }

      setImageUrls((prev) => [...prev, ...uploaded]);

      Swal.fire("Success!", "Image(s) uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setUpdating(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;

    const updatedHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,

      // ✅ new + legacy fields together
      images: imageUrls,
      image: imageUrls[0] || "",

      // ✅ NEW: editable fields from AddHabit
      isPublic: form.isPublic.checked,
      isFeatured: form.isFeatured.checked,

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
        className="max-w-md"
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
                className="w-full border border-gray-300 p-2 rounded h-28"
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

            {/*  NEW: Public & Featured (editable) */}
            <div className="flex gap-4 mt-2">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold">Make Public?</span>
                <input
                  type="checkbox"
                  name="isPublic"
                  defaultChecked={!!habit.isPublic}
                  className="checkbox checkbox-primary ml-2"
                />
              </label>

              <label className="label cursor-pointer">
                <span className="label-text font-semibold">
                  Feature this habit?
                </span>
                <input
                  type="checkbox"
                  name="isFeatured"
                  defaultChecked={!!habit.isFeatured}
                  className="checkbox checkbox-secondary ml-2"
                />
              </label>
            </div>

            {/*  Multiple images upload */}
            <div>
              <label className="block mb-1 font-semibold">
                Upload New Images (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full border bg-[#99c8e2] hover:bg-blue-600 border-gray-300 p-2 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                Up to 5 images. First image will be used as cover.
              </p>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`preview-${idx + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
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
