import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const Signup = () => {
  const { registerWithEmail, signInWithGoogle, signInWithFacebook, loading } =
    useAuth();

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    return "";
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required.";

    if (!formData.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(formData.email))
      next.email = "Invalid email format.";

    const passError = validatePassword(formData.password);
    if (passError) next.password = passError;

    if (!formData.confirmPassword)
      next.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      next.confirmPassword = "Passwords do not match.";

    return next;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await registerWithEmail({
        name: formData.name.trim(),
        photoURL: formData.photoURL.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch {
      // toast already shown in AuthContext
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed up with Google!");
      navigate("/");
    } catch {
      // toast already shown
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await signInWithFacebook();
      toast.success("Signed up with Facebook!");
      navigate("/");
    } catch {
      // toast already shown
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md"
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Create an Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Photo URL */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your photo URL (optional)"
                  className="input input-bordered w-full"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`input input-bordered w-full pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password}</p>
                )}
                {!errors.password && (
                  <p className="text-xs text-base-content/60 mt-1">
                    Must include uppercase, lowercase, and a number.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-type your password"
                    className={`input input-bordered w-full pr-12 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleGoogleSignup}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FcGoogle size={22} />
                Google
              </button>

              <button
                onClick={handleFacebookSignup}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaFacebook className="text-blue-600" size={20} />
                Facebook
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
