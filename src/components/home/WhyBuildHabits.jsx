import { motion } from "framer-motion";

const WhyBuildHabits = () => {
  const items = [
    { title: "Better Focus", desc: "Sharpen your mind and stay consistent." },
    { title: "Reduced Stress", desc: "Feel calmer through daily discipline." },
    {
      title: "Improved Health",
      desc: "Stay active, eat healthy, and sleep better.",
    },
    { title: "Goal Achievement", desc: "Turn your dreams into daily actions." },
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
          Why Build Habits?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
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
  );
};

export default WhyBuildHabits;
