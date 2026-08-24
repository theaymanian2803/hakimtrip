import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Camera } from 'lucide-react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop',
    alt: 'Sunrise over Moroccan mountains',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
    alt: 'High Atlas peaks at golden hour',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop',
    alt: 'Travelers on a calm lake',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?w=800&auto=format&fit=crop',
    alt: 'Golden Sahara dunes',
    className: 'col-span-2',
  },
];

const miniStats = [
  { value: '10+', label: 'Years' },
  { value: '5,000+', label: 'Travelers' },
  { value: '4.9', label: 'Rating' },
];

export function MemoriesBanner() {
  return (
    <section id="memories" className="py-24 bg-brown">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Photo Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 auto-rows-[150px] sm:auto-rows-[170px] gap-4">
              {images.map((image) => (
                <div
                  key={image.src}
                  className={`relative rounded-2xl overflow-hidden group ${image.className}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Overlapping Quote Card */}
            <div className="absolute -bottom-8 left-6 right-6 sm:left-8 sm:right-auto sm:w-80 bg-card rounded-2xl p-6 shadow-elevated hidden md:block">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-foreground font-display text-base leading-snug">
                "We came for the desert and left with a second family."
              </p>
              <p className="text-muted-foreground text-sm mt-3">
                — Anna & Tom, Sahara Expedition
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand/10 border border-sand/20 rounded-full mb-6">
              <Camera className="w-4 h-4 text-gold" />
              <span className="text-sand text-sm font-medium tracking-wide uppercase">
                Creating Memories
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-sand mb-5 leading-tight">
              Every Journey Leaves a Story Worth Telling
            </h2>

            <p className="text-sand/85 text-lg leading-relaxed mb-8 max-w-xl">
              From sunrises over the Atlas to nights beneath Saharan stars — each
              trip we craft becomes a chapter your family will retell for years.
              The photo album is just the beginning.
            </p>

            {/* Mini Stats */}
            <div className="flex gap-10 mb-10">
              {miniStats.map((stat, index) => (
                <div key={stat.label} className={index > 0 ? 'border-l border-sand/15 pl-10' : ''}>
                  <div className="font-display text-3xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-sand/75 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-terracotta-dark text-primary-foreground px-8 py-6 text-lg rounded-full shadow-elevated transition-all duration-300 hover:scale-105"
            >
              <Link to="/excursions">
                Start Your Adventure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}