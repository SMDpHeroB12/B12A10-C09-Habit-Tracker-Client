import { motion } from "framer-motion";

const NewsletterCTA = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-base-100 shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Get weekly habit-building tips
            </h2>
            <p className="text-base-content/70 mt-2">
              Simple advice to stay consistent — no spam.
            </p>
          </div>

          <form
            className="flex w-full md:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full md:w-72"
              required
            />
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
