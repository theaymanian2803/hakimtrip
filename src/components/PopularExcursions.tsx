import { Link } from 'react-router-dom';
import { useExcursions } from '@/contexts/ExcursionsContext';
import { ExcursionCard } from './ExcursionCard';
import { Button } from '@/components/ui/button';
import { Compass, ArrowRight } from 'lucide-react';

export function PopularExcursions() {
  const { excursions } = useExcursions();
  
  // Show only first 6 excursions on homepage
  const featuredExcursions = excursions.slice(0, 6);
  return (
    <section id="excursions" className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              Our Experiences
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Excursions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Handcrafted journeys designed to immerse you in Morocco's rich culture, 
            stunning landscapes, and warm hospitality.
          </p>
        </div>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExcursions.map((excursion, index) => (
            <div 
              key={excursion.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ExcursionCard excursion={excursion} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {excursions.length > 6 && (
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-terracotta-dark text-primary-foreground rounded-full px-8"
            >
              <Link to="/excursions">
                View All Excursions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        {featuredExcursions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No excursions available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
