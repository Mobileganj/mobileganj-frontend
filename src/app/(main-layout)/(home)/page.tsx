import HeroBanner from "./_components/HeroBanner";
import FeaturedCategories from "./_components/FeaturedCategories";
import NewArrivalsSection from "./_components/NewArrivalsSection";
import BrandNewPhoneSection from "./_components/BrandNewPhoneSection";
import UsedPhoneSection from "./_components/UsedPhoneSection";
import PreOrderSection from "./_components/PreOrderSection";
import TestimonialsSection from "./_components/TestimonialsSection";

const HomePage = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Slider */}
        <HeroBanner />

        {/* Categories */}
        <FeaturedCategories />

        {/* Featured Products — Best Deals + Top Selling tabs */}
        <NewArrivalsSection />

        {/* Brand New Phones */}
        <BrandNewPhoneSection />

        {/* Pre Owned */}
        <UsedPhoneSection />
      </div>

      {/* Pre-order (full width) */}
      <PreOrderSection />

      {/* Customer Reviews */}
      <div className="container mx-auto px-4">
        <TestimonialsSection />
      </div>

      {/* Trust Features Strip */}
    </div>
  );
};

export default HomePage;
