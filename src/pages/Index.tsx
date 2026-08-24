import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PopularExcursions } from '@/components/PopularExcursions';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Testimonials } from '@/components/Testimonials';
import { MemoriesBanner } from '@/components/MemoriesBanner';
import { Footer } from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PopularExcursions />
      <WhyChooseUs />
      <Testimonials />
      <MemoriesBanner />
      <Footer />
    </div>
  );
}
