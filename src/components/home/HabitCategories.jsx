import { motion } from "framer-motion";

const HabitCategories = () => {
  const categories = [
    "Health",
    "Fitness",
    "Study",
    "Mindfulness",
    "Productivity",
    "Sleep",
    "Nutrition",
    "Self-Discipline",
  ];

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10 text-primary"
        >
          Popular Habit Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-xl bg-base-100 shadow-md text-center"
            >
              <p className="font-semibold">{cat}</p>
              <p className="text-xs text-base-content/60 mt-1">
                Build consistent routines
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HabitCategories;
