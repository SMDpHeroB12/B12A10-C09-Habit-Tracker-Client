import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      q: "Do I need an account to use Habit Tracker?",
      a: "You can browse public habits without an account, but tracking and managing your own habits requires login.",
    },
    {
      q: "Can I make my habits public?",
      a: "Yes. If you choose public visibility, others can view your habit from the Browse page.",
    },
    {
      q: "How does streak tracking work?",
      a: "When you complete a habit regularly based on your schedule, your streak increases to help you stay consistent.",
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
        FAQ
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="collapse collapse-arrow bg-base-200"
          >
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-medium">{item.q}</div>
            <div className="collapse-content">
              <p className="text-base-content/70">{item.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
