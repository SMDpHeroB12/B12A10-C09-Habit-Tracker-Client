import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CommunitySection = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
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
  );
};

export default CommunitySection;
