import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          About Habit Tracker
        </h1>
        <p className="mt-4 text-base-content/80 leading-relaxed">
          Habit Tracker is a productivity-focused web application that helps you
          build consistent routines. You can create habits, track daily
          completion, explore public habits, and stay motivated through a clean,
          responsive UI.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Why this project?</h2>
            <p className="text-base-content/70">
              To encourage small daily actions that compound into big results.
              Consistency is the real superpower.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">What you can do</h2>
            <ul className="list-disc ml-5 text-base-content/70 space-y-1">
              <li>Create and manage habits</li>
              <li>Track completion and build streaks</li>
              <li>Explore and learn from public habits</li>
              <li>Stay consistent on any device</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-base-200 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <p className="text-base-content/70">
            React, Tailwind CSS, DaisyUI, Firebase Authentication, Node.js,
            Express.js, MongoDB
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
