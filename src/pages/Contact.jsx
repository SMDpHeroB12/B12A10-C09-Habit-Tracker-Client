import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message submitted (demo). We'll connect this later!");
    e.target.reset();
  };

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Contact</h1>
        <p className="mt-4 text-base-content/80">
          Have a question or feedback? Send a message — we’ll get back to you.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-base-200 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
            <p className="text-base-content/70">
              Email:{" "}
              <a className="link link-hover" href="mailto:smdwcloud@gmail.com">
                smdwcloud@gmail.com
              </a>
            </p>
            <p className="text-base-content/70">
              Phone:{" "}
              <a className="link link-hover" href="tel:+8801791717966">
                +880-179-1717-966
              </a>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-xl bg-base-200 shadow-md space-y-4"
          >
            <div>
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                placeholder="Write your message"
                required
              ></textarea>
            </div>

            <button className="btn btn-primary w-full" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
