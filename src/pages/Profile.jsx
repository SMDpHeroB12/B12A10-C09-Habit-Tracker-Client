import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in.");
    if (!name.trim()) return toast.error("Name is required.");

    try {
      setSaving(true);
      await updateProfile(user, {
        displayName: name.trim(),
        photoURL: photoURL.trim(),
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          My Profile
        </h1>
        <p className="mt-2 text-base-content/70">
          View and update your personal information.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="p-6 rounded-xl bg-base-200 shadow-md md:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user?.photoURL ||
                      "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                    }
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                {user?.displayName || "Anonymous"}
              </h2>
              <p className="text-sm text-base-content/70">{user?.email}</p>
            </div>
          </div>

          {/* Edit Form */}
          <form
            onSubmit={handleUpdate}
            className="p-6 rounded-xl bg-base-200 shadow-md md:col-span-2 space-y-4"
          >
            <div>
              <label className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://..."
              />
              <p className="text-xs text-base-content/60 mt-1">
                Optional — provide a valid image URL.
              </p>
            </div>

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
