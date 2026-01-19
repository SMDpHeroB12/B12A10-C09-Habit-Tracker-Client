import HomeHeroCarousel from "../components/home/HomeHeroCarousel";
import FeaturedHabits from "../components/home/FeaturedHabits";
import WhyBuildHabits from "../components/home/WhyBuildHabits";
import CommunitySection from "../components/home/CommunitySection";
import HabitTips from "../components/home/HabitTips";

import HowItWorks from "../components/home/HowItWorks";
import HabitCategories from "../components/home/HabitCategories";
import StatsSection from "../components/home/StatsSection";
import FAQSection from "../components/home/FAQSection";
import NewsletterCTA from "../components/home/NewsletterCTA";
import FinalCTABanner from "../components/home/FinalCTABanner";

const Home = () => {
  return (
    <div>
      {/* 1) Hero / Carousel */}
      <HomeHeroCarousel />

      {/* 2) Featured Habits (dynamic) */}
      <FeaturedHabits />

      {/* 3) Why Build Habits */}
      <WhyBuildHabits />

      {/* 4) How It Works */}
      <HowItWorks />

      {/* 5) Categories */}
      <HabitCategories />

      {/* 6) Stats (non-fake, can be dynamic later) */}
      <StatsSection />

      {/* 7) Community CTA */}
      <CommunitySection />

      {/* 8) Tips */}
      <HabitTips />

      {/* 9) FAQ */}
      <FAQSection />

      {/* 10) Newsletter CTA */}
      <NewsletterCTA />

      {/* 11) Final CTA Banner */}
      <FinalCTABanner />
    </div>
  );
};

export default Home;
