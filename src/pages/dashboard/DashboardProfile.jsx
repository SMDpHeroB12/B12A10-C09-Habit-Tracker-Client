import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase.config";

const DashboardProfile = () => {
  const { user, refreshRole } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      toast.success("Profile updated!");
      refreshRole?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-primary mb-4">My Profile</h2>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <form onSubmit={save} className="space-y-3">
            <div>
              <label className="label font-semibold">Name</label>
              <input
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>

            <div>
              <label className="label font-semibold">Email</label>
              <input
                className="input input-bordered w-full"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <button disabled={saving} className="btn btn-primary">
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
