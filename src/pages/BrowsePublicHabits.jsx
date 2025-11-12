import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicHabits = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/habits/public`
        );
        const data = await res.json();
        if (data.success) {
          setHabits(data.habits);
        } else {
          toast.error("Failed to load public habits");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching public habits");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicHabits();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Browse Public Habits
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : habits.length === 0 ? (
        <p className="text-center text-gray-500">
          No public habits yet. Be the first to share!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <motion.div
              key={habit._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-200 shadow-md hover:shadow-xl transition"
            >
              {habit.image && (
                <figure className="h-48 w-full overflow-hidden">
                  <img
                    src={habit.image}
                    alt={habit.title}
                    className="object-cover w-full h-full"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold text-primary">
                  {habit.title}
                </h3>
                <p className="text-sm text-base-content/70 mb-2">
                  {habit.description?.slice(0, 100)}…
                </p>
                <p className="text-xs italic text-gray-500 mb-4">
                  Created by: {habit.userName || "Anonymous"}
                </p>
                <div className="card-actions justify-end">
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
    </div>
  );
};

export default BrowsePublicHabits;
