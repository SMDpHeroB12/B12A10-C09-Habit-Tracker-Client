import { motion } from "framer-motion";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { MdUpload } from "react-icons/md";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
  const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const handleAddHabit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const image = form.image.files[0];
    const isPublic = form.isPublic.checked;
    const isFeatured = form.isFeatured.checked;

    try {
      let uploadedImageURL = "";

      //  If user uploaded an image, upload to ImgBB first
      if (image) {
        const imgData = new FormData();
        imgData.append("image", image);

        const imgRes = await fetch(imageHostingURL, {
          method: "POST",
          body: imgData,
        });
        const imgResult = await imgRes.json();

        if (imgResult.success) {
          uploadedImageURL = imgResult.data.display_url;
          setImageURL(uploadedImageURL);
        } else {
          toast.error("Image upload failed");
        }
      }

      // Create the new habit data
      const newHabit = {
        title,
        description,
        category,
        reminderTime,
        image: uploadedImageURL || "",
        userEmail: user?.email,
        userName: user?.displayName,
        createdAt: new Date(),
        isPublic,
        isFeatured,
      };

      // Send to backend
      const res = await fetch(
        "https://habit-tracker-server-iota.vercel.app/habits",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newHabit),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Habit added successfully!");
        form.reset();
        navigate("/");
      } else {
        toast.error("Failed to add habit!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add New Habit
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleAddHabit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Habit Title"
            required
            className="w-full p-3 border border-gray-200 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            required
            className="w-full p-3 border border-gray-200 rounded-lg"
          ></textarea>

          {/* Dropdown Category */}
          <select
            name="category"
            required
            className="w-full p-3 border border-gray-200 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>

          {/* Reminder Time Picker */}
          <div className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <label className="block mb-1 font-semibold w-[40%]">
              Reminder Time
            </label>
            <input
              type="time"
              name="reminderTime"
              required
              className="p-3 border border-gray-200 rounded-lg w-[60%]"
            />
          </div>

          {/* Upload Image */}
          <div className="flex justify-between p-3 border border-gray-200 rounded-lg">
            <label
              htmlFor="input"
              className="flex w-[30%] items-center justify-center"
            >
              Upload an image :
            </label>
            <div className="flex justify-center items-center text-white rounded-lg bg-[#99c8e2] ml-2 hover:bg-blue-600 font-semibold w-[65%] h-16 mx-auto">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full flex pl-5"
              />
              <MdUpload className="w-[30%] flex place-items-center justify-center" />
            </div>
          </div>

          {/* Public & Featured Checkboxes */}
          <div className="flex gap-4 mt-2">
            <label className="label cursor-pointer">
              <span className="label-text">Make Public?</span>
              <input
                type="checkbox"
                name="isPublic"
                className="checkbox checkbox-primary ml-2"
              />
            </label>

            <label className="label cursor-pointer">
              <span className="label-text">Feature this habit?</span>
              <input
                type="checkbox"
                name="isFeatured"
                className="checkbox checkbox-secondary ml-2"
              />
            </label>
          </div>

          {/* Read-only user info */}
          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
          />
          <input
            type="text"
            name="userName"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Habit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddHabit;
