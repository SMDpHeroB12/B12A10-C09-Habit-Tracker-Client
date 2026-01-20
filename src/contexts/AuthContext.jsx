import { createContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase.config";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const getFriendlyAuthError = (error) => {
  const code = error?.code || "";

  if (code === "auth/invalid-credential") return "Invalid email or password.";
  if (code === "auth/user-not-found") return "No user found with this email.";
  if (code === "auth/wrong-password") return "Incorrect password.";
  if (code === "auth/email-already-in-use") return "Email already in use.";
  if (code === "auth/weak-password")
    return "Password is too weak. Try a stronger one.";
  if (code === "auth/invalid-email")
    return "Please enter a valid email address.";
  if (code === "auth/popup-closed-by-user")
    return "Popup was closed. Try again.";
  if (code === "auth/account-exists-with-different-credential")
    return "Account exists with a different sign-in method. Try Google or Email login.";
  if (code === "auth/operation-not-allowed")
    return "This sign-in method is not enabled in Firebase.";

  return error?.message || "Something went wrong. Please try again.";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // auth loading
  const [loading, setLoading] = useState(true);

  // role loading
  const [role, setRole] = useState(null); // "user" | "admin"
  const [roleLoading, setRoleLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const googleProvider = new GoogleAuthProvider();

  const upsertUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    try {
      const payload = {
        email: firebaseUser.email,
        name: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",
      };

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data?.success && data?.role) {
        setRole(data.role);
      }
    } catch (err) {
      console.error(err);
      // keep silent to avoid annoying user on every refresh
    }
  };

  const fetchRole = async (email) => {
    if (!email) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    try {
      setRoleLoading(true);
      const res = await fetch(
        `${API_URL}/users/role?email=${encodeURIComponent(email)}`,
      );
      const data = await res.json();
      if (data?.success) setRole(data.role || "user");
      else setRole("user");
    } catch (err) {
      console.error(err);
      setRole("user");
    } finally {
      setRoleLoading(false);
    }
  };

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      toast.error(getFriendlyAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async ({ name, photoURL, email, password }) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(result.user, {
        displayName: name,
        photoURL:
          photoURL ||
          "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
      });

      // update local user so UI updates instantly
      setUser({
        ...result.user,
        displayName: name,
        photoURL:
          photoURL ||
          "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
      });

      return result;
    } catch (error) {
      toast.error(getFriendlyAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      toast.error(getFriendlyAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      setRole(null);
    } catch (error) {
      toast.error(getFriendlyAuthError(error));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser?.email) {
        setRole(null);
        setRoleLoading(false);
        return;
      }

      // 1) save/update user in DB (creates users collection doc + assigns role)
      await upsertUserToDB(currentUser);

      // 2) fetch role
      await fetchRole(currentUser.email);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      role,
      roleLoading,
      loginWithEmail,
      registerWithEmail,
      logOut,
      signInWithGoogle,
      refreshRole: () => fetchRole(user?.email),
    }),
    [user, loading, role, roleLoading],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
