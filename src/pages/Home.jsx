import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const TemporaryHabits = [
    {
      _id: "1",
      name: "Morning Jogging",
      description: "Start your day with a fresh 20-minute jog to boost energy.",
      creatorName: "Alex",
    },
    {
      _id: "2",
      name: "Read Books",
      description: "Read at least 10 pages daily to expand your knowledge.",
      creatorName: "Sophia",
    },
    {
      _id: "3",
      name: "Meditation",
      description:
        "Spend 10 minutes meditating to reduce stress and improve focus.",
      creatorName: "Daniel",
    },
    {
      _id: "4",
      name: "Drink Water",
      description: "Stay hydrated by drinking 8 glasses of water every day.",
      creatorName: "Emma",
    },
    {
      _id: "5",
      name: "Write Journal",
      description: "Write your thoughts and goals every night before sleeping.",
      creatorName: "Liam",
    },
    {
      _id: "6",
      name: "Sleep Early",
      description: "Go to bed before 11 PM for a healthy sleep cycle.",
      creatorName: "Olivia",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHabits(TemporaryHabits);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section / Banner */}
      <section className="mt-5">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={4000}
          showStatus={false}
        >
          <div className="relative">
            <img
              src="https://i.ibb.co/cXNwnRHB/cup-note.jpg"
              alt="Healthy Routine"
              className="object-cover w-full h-[60vh]"
            />
            <div className="absolute inset-0 bg-[#00000048]  flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Build Healthy Routines
              </h2>
              <p className="mt-3 max-w-2xl">
                Develop life-changing habits and track your progress daily.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.ibb.co/yFGTpS8Q/gym.jpg"
              alt="Stay Consistent"
              className="object-cover w-full h-[60vh]"
            />
            <div className="absolute inset-0 bg-[#00000048]  flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Stay Consistent
              </h2>
              <p className="mt-3 max-w-2xl">
                Every small step you take adds up to massive success.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.ibb.co/JjYx2rq6/Group-Collaboration.jpg"
              alt="Boost Productivity"
              className="object-cover w-full h-[60vh]"
            />
            <div className="absolute inset-0 bg-[#00000048] flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Boost Productivity
              </h2>
              <p className="mt-3 max-w-2xl">
                Create a daily routine that helps you stay focused and sharp.
              </p>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Featured Habits */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-primary"
        >
          Featured Habits
        </motion.h2>

        {loading ? (
          <div className="text-center">
            Loading habits...
            <span className="loading loading-ring loading-xl"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <motion.div
                key={habit._id}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-200 shadow-md hover:shadow-xl transition"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg font-semibold text-primary">
                    {habit.name}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-2">
                    {habit.description.slice(0, 80)}...
                  </p>
                  <p className="text-xs italic text-gray-500">
                    Created by: {habit.creatorName || "Anonymous"}
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

      {/* Why Build Habits */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-10 text-primary"
          >
            Why Build Habits?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Better Focus",
                desc: "Sharpen your mind and stay consistent.",
              },
              {
                title: "Reduced Stress",
                desc: "Feel calmer through daily discipline.",
              },
              {
                title: "Improved Health",
                desc: "Stay active, eat healthy, and sleep better.",
              },
              {
                title: "Goal Achievement",
                desc: "Turn your dreams into daily actions.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-base-100 shadow-md text-center"
              >
                <h3 className="font-semibold text-lg text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">
            Join a Supportive Community
          </h2>
          <p className="text-base text-base-content/70 mb-6">
            Connect with other habit-builders, share your progress, and inspire
            each other to stay consistent.
          </p>
          <Link to="/browse" className="btn btn-primary">
            Explore Public Habits
          </Link>
        </motion.div>
      </section>

      <section className="bg-base-200 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">
            Habit-Building Tips 🧩
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Start small and stay consistent.",
              "Track your progress visually.",
              "Reward yourself for small wins.",
            ].map((tip, i) => (
              <div
                key={i}
                className="p-6 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-base-content/80">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
