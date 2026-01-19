import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Privacy Policy
        </h1>

        <p className="mt-4 text-base-content/80 leading-relaxed">
          This project is a portfolio application. We collect only the data
          needed to provide the core habit tracking features (such as user
          account info and habit data). We do not sell your data.
        </p>

        <div className="mt-8 space-y-4">
          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">What we store</h2>
            <ul className="list-disc ml-5 text-base-content/70 space-y-1">
              <li>Authentication info (via Firebase)</li>
              <li>Habit details you create</li>
              <li>Completion history for streak tracking</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Your control</h2>
            <p className="text-base-content/70">
              You can delete your habits anytime. In later updates, we can add a
              full account deletion option.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-base-content/70">
              If you have concerns, reach out at{" "}
              <a className="link link-hover" href="mailto:smdwcloud@gmail.com">
                smdwcloud@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
