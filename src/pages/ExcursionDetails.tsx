import { useParams, Link } from 'react-router-dom';
import { useExcursions } from '@/contexts/ExcursionsContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { ImageGalleryLightbox } from '@/components/ImageGalleryLightbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Users, Star, CheckCircle } from 'lucide-react';

export default function ExcursionDetails() {
  const { id } = useParams<{ id: string }>();
  const { getExcursion } = useExcursions();

  const excursion = id ? getExcursion(id) : undefined;

  if (!excursion) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Excursion Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The excursion you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="bg-primary hover:bg-terracotta-dark text-primary-foreground rounded-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header with back button */}
      <section className="pt-24 pb-6 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground -ml-4 mb-4"
          >
            <Link to="/excursions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Excursions
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge className="bg-accent text-accent-foreground border-0">
              {excursion.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span>4.9 (127 reviews)</span>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            {excursion.title}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>From Marrakech</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <ImageGalleryLightbox
            images={excursion.images || []}
            mainImage={excursion.imageUrl}
            alt={excursion.title}
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price Card */}
              <div className="bg-card rounded-2xl p-6 shadow-card flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-muted-foreground text-sm">Starting from</span>
                  <div className="font-display text-4xl font-bold text-primary">
                    ${excursion.price}
                  </div>
                  <span className="text-muted-foreground text-sm">per person</span>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-accent mx-auto mb-1" />
                    <span className="text-sm text-muted-foreground">Full Day</span>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-accent mx-auto mb-1" />
                    <span className="text-sm text-muted-foreground">Max 12</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl p-8 shadow-card space-y-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  About This Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {excursion.description}
                </p>

                {/* What's Included */}
                <div className="pt-4">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Professional local guide',
                      'Hotel pickup & drop-off',
                      'Comfortable transport',
                      'Traditional lunch',
                      'All entrance fees',
                      'Bottled water',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-elevated sticky top-24">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Book This Excursion
                </h2>
                <BookingForm excursionTitle={excursion.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
