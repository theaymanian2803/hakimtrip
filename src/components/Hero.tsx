import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { MapPin, Compass } from 'lucide-react'
import heroImage from '@/assets/hero-desert.jpg'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-brown/60 via-brown/40 to-brown/70" />
      </div>

      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold/50 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-sand/30 rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand/20 backdrop-blur-sm rounded-full border border-sand/30">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="text-sand text-sm font-medium tracking-wide uppercase">
              Based in Marrakech, Morocco
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-sand leading-tight">
            Discover the <span className="text-gradient-gold">Magic</span> of Morocco
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-sand/90 max-w-2xl mx-auto leading-relaxed">
            Unforgettable excursions through ancient medinas, golden deserts, and majestic
            mountains. Experience authentic Moroccan hospitality with Marrakech Escapes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-terracotta-dark text-primary-foreground px-8 py-6 text-lg rounded-full shadow-elevated transition-all duration-300 hover:scale-105">
              <Link to="/excursions">
                <Compass className="w-5 h-5 mr-2" />
                Explore Excursions
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-primary hover:bg-terracotta-dark text-primary-foreground px-8 py-6 text-lg rounded-full shadow-elevated transition-all duration-300 hover:scale-105">
              <Link to="/#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-sand/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-sand/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}
