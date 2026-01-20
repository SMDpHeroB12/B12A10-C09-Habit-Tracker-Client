import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const DEMO = {
  user: { email: "smdnayem52@gmail.com", password: "SMDNAYEM2025@nayem" },
  admin: { email: "md.bellal010@gmail.com", password: "MD2026@billal" },
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const Login = () => {
  const { loginWithEmail, signInWithGoogle, signInWithFacebook, loading } =
    useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => location.state?.from?.pathname || "/", [location]);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email.";

    if (!password) next.password = "Password is required.";
    return next;
  };

  const doLogin = async (e) => {
    e?.preventDefault?.();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await loginWithEmail(email.trim(), password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch {
      // toast already shown from AuthContext
    }
  };

  const handleDemoLogin = async (type) => {
    const creds = DEMO[type];
    setEmail(creds.email);
    setPassword(creds.password);

    toast.loading(
      `Logging in as Demo ${type === "admin" ? "Admin" : "User"}...`,
      {
        id: "demo-login",
      },
    );

    try {
      await loginWithEmail(creds.email, creds.password);
      toast.success("Demo login successful!", { id: "demo-login" });
      navigate(from, { replace: true });
    } catch {
      toast.error("Demo login failed. Check Firebase users & password.", {
        id: "demo-login",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      // toast already shown
    }
  };

  const handleFacebook = async () => {
    try {
      await signInWithFacebook();
      toast.success("Logged in with Facebook!");
      navigate(from, { replace: true });
    } catch {
      // toast already shown
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md"
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center text-primary mb-4">
              Log-in
            </h2>

            <form onSubmit={doLogin} className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    className={`input input-bordered w-full pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider">OR</div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1  gap-2">
              <button
                onClick={handleGoogle}
                className="btn w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FcGoogle size={22} />
                Continue with Google
              </button>

              {/* <button
                onClick={handleFacebook}
                className="btn w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                <FaFacebook className="text-blue-600" size={20} />
                Facebook
              </button> */}
            </div>
            {/* Demo Buttons */}
            <div className="divider">Demo Credentials</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="btn btn-sm btn-soft btn-accent"
                disabled={loading}
              >
                Demo User Login
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-sm btn-warning btn-soft"
                disabled={loading}
              >
                Demo Admin Login
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
