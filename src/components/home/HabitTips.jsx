import { motion } from "framer-motion";

const HabitTips = () => {
  const tips = [
    "Start small and stay consistent.",
    "Track your progress visually.",
    "Reward yourself for small wins.",
  ];

  return (
    <section className="bg-base-200 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-bold text-primary mb-6">
          Habit-Building Tips 🧩
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
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
  );
};

export default HabitTips;
