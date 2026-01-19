import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

const Slide = ({ image, title, subtitle, user }) => {
  return (
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-[60vh] md:h-[70vh]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#00000066] flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-3 max-w-2xl text-base md:text-lg text-white/90"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          {!user && (
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          )}
          <Link to="/browse" className="btn btn-outline btn-white text-white">
            Explore Habits
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="absolute bottom-6 flex flex-col items-center"
        >
          <span className="text-xs tracking-wider text-white/80">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="mt-2 w-8 h-12 rounded-full border border-white/70 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const HomeHeroCarousel = () => {
  const { user } = useAuth();
  return (
    <section className="mt-5">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={false}
        swipeable
        emulateTouch
      >
        <Slide
          image="https://i.ibb.co/cXNwnRHB/cup-note.jpg"
          title="Build Healthy Routines"
          subtitle="Develop life-changing habits and track your progress daily."
          user={user}
        />

        <Slide
          image="https://i.ibb.co/yFGTpS8Q/gym.jpg"
          title="Stay Consistent"
          subtitle="Every small step you take adds up to long-term success."
          user={user}
        />

        <Slide
          image="https://i.ibb.co/JjYx2rq6/Group-Collaboration.jpg"
          title="Boost Productivity"
          subtitle="Create a daily routine that helps you stay focused and sharp."
          user={user}
        />
      </Carousel>
    </section>
  );
};

export default HomeHeroCarousel;
