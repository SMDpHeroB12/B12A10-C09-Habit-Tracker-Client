import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTABanner = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-primary text-primary-content p-10"
      >
        <h2 className="text-3xl font-bold">
          Ready to build habits that stick?
        </h2>
        <p className="mt-3 opacity-90">
          Start small today — your future self will thank you.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/signup" className="btn btn-outline btn-primary-content">
            Get Started
          </Link>
          <Link to="/browse" className="btn btn-ghost text-primary-content">
            Explore Public Habits
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTABanner;
