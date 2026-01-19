import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FeaturedHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load 6 newest public habits from DB
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/habits/public`,
        );
        const data = await res.json();

        if (data.success && Array.isArray(data.habits)) {
          // Sort by newest first and take only 6
          const sorted = data.habits
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
          setHabits(sorted);
        } else {
          toast.error("Failed to load habits");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching public habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-8 text-primary"
      >
        Featured Habits
      </motion.h2>

      {loading ? (
        <div className="text-center">
          Loading habits...
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500">
          No public habits found. Be the first to share!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <motion.div
              key={habit._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-200 shadow-md hover:shadow-xl transition"
            >
              <figure className="relative h-48 w-full overflow-hidden">
                <img
                  src={habit.image || "https://i.ibb.co/0f1YTRh/default.jpg"}
                  alt={habit.title}
                  className="object-cover w-full h-full"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg font-semibold text-primary">
                  {habit.title}
                </h3>
                <p className="text-sm text-base-content/70 mb-2">
                  {habit.description?.slice(0, 80)}.
                </p>
                <p className="text-xs italic text-gray-500">
                  Created by: {habit.userName || "Anonymous"}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/habit/${habit._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedHabits;
