import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

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

  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/habits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHabit(data.habit);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, API_URL]);

  const handleMarkComplete = async () => {
    if (!habit) return;

    setIsMarking(true);
    try {
      const res = await fetch(`${API_URL}/habits/${id}/complete`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Habit marked complete!");

        const today = new Date().toISOString().split("T")[0];
        const updatedHistory = [...(habit.completionHistory || []), today];

        setHabit((prev) => ({
          ...prev,
          completionHistory: updatedHistory,
        }));
      } else {
        toast.error(data.message || "Already completed today!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsMarking(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (!habit)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Habit not found
        </h2>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );

  const {
    title,
    description,
    category,
    image,
    images,
    userName,
    userEmail,
    createdAt,
    completionHistory,
  } = habit;

  const currentStreak = calculateStreak(completionHistory);

  // ✅ support both images[] and legacy image
  const media =
    Array.isArray(images) && images.length ? images : image ? [image] : [];

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden"
      >
        {/* ✅ Images Slider */}
        {media.length > 0 && (
          <div className="border-b">
            <Carousel
              showThumbs={media.length > 1}
              infiniteLoop={media.length > 1}
              autoPlay={media.length > 1}
              interval={3500}
              showStatus={false}
              swipeable
              emulateTouch
            >
              {media.map((src, idx) => (
                <div key={idx}>
                  <img
                    src={src}
                    alt={`${title} - ${idx + 1}`}
                    className="w-full h-72 object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>

          {/* Overview */}
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Overview
            </h3>
            <p className="text-base text-base-content/80">{description}</p>
          </div>

          {/* Key Info */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Key Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <p>
                <span className="font-semibold">Category:</span> {category}
              </p>
              <p>
                <span className="font-semibold">Current Streak:</span>{" "}
                {currentStreak || 0} 🔥
              </p>
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          {/* Created By */}
          <div className="border-t pt-4 mt-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Created By
            </h3>
            <p className="text-sm">
              <span className="font-medium">Name:</span> {userName || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {userEmail || "N/A"}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/my-habits" className="btn btn-outline">
              <FaArrowLeft /> Back to My Habits
            </Link>
            <button
              onClick={handleMarkComplete}
              disabled={isMarking}
              className="btn btn-primary"
            >
              {isMarking ? "Marking..." : "Mark Complete"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HabitDetails;
