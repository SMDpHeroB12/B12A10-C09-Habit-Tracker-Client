import { motion } from "framer-motion";

const StatsSection = () => {
  // NOTE: These are modest, non-crazy values.
  // Later we can replace them with real backend-driven stats.
  const stats = [
    { label: "Daily tracking made simple", value: "Fast & Easy" },
    { label: "Streak-focused habit flow", value: "Consistency" },
    { label: "Public habits to explore", value: "Community" },
    { label: "Responsive UI experience", value: "All Devices" },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10 text-primary"
      >
        Progress-Friendly Experience
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl bg-base-200 shadow-md p-6 text-center"
          >
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="mt-2 text-sm text-base-content/70">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm text-base-content/60 mt-6"
      >
        (We’ll connect these cards to real backend stats when we build the
        Dashboard Overview.)
      </motion.p>
    </section>
  );
};

export default StatsSection;
