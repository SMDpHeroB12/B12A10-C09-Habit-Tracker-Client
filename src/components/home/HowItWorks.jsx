import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create a Habit",
      desc: "Add a habit with a goal and a schedule that fits your lifestyle.",
    },
    {
      title: "Track Daily",
      desc: "Mark completion and stay consistent with a simple daily flow.",
    },
    {
      title: "Improve Over Time",
      desc: "Review progress, build streaks, and keep leveling up.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-10 text-primary"
      >
        How It Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-xl bg-base-200 shadow-md"
          >
            <div className="text-sm opacity-70 mb-2">Step {i + 1}</div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-base-content/70">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
