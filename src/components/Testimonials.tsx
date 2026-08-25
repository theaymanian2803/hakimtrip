import { Star, Quote, MessageSquareHeart } from 'lucide-react';

const testimonials = [
  {
    name: 'Emma Richardson',
    country: 'United Kingdom',
    trip: 'Sahara Desert Adventure',
    headline: 'The night under the stars was pure magic',
    review:
      'Our guide Ali made the camel trek feel effortless, and the camp beneath the Milky Way was unreal. Every detail — the tea, the fire, the stories — was perfect. Worth every penny.',
  },
  {
    name: 'Lucas Moreau',
    country: 'France',
    trip: 'Atlas Mountains Day Trip',
    headline: 'The mountains came alive with Brahim',
    review:
      "Perfectly organised from pickup to drop-off. Brahim's stories about Berber village life made the Atlas feel personal, and the mint tea on that terrace — best I've ever had.",
  },
  {
    name: 'Sofia Ricci',
    country: 'Italy',
    trip: 'Essaouira Coastal Escape',
    headline: 'The perfect escape from the medina',
    review:
      'Fresh fish by the port, sea breeze in our hair, and a guide who knew every corner and craftsman by name. We left with photos, spices, and one of the best days of our trip.',
  },
  {
    name: 'James Whitfield',
    country: 'United States',
    trip: 'Marrakech Medina Walking Tour',
    headline: 'I finally saw the real Marrakech',
    review:
      "This was my third visit, and I'd missed all of it until now. Hidden riads, a rooftop with the best view in the city, and the street food spot only locals know. Book it first.",
  },
  {
    name: 'Priya Sharma',
    country: 'India',
    trip: 'Moroccan Cooking Class',
    headline: 'The highlight of our honeymoon',
    review:
      'Learning tagine with Fatima in her own kitchen was warm, fun, and delicious. We cook her recipes at home every week now — and we always think of Marrakech.',
  },
  {
    name: 'Michael Weber',
    country: 'Germany',
    trip: 'Ouzoud Waterfalls Excursion',
    headline: 'The little touches made it unforgettable',
    review:
      'The falls are stunning, but it was the details — fresh oranges, a quiet boat ride to the base, monkeys everywhere — that made this trip unforgettable. Flawless organisation.',
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gold fill-gold" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full mb-6 shadow-soft">
            <MessageSquareHeart className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              Traveler Stories
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Voices of Happy Travelers
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Real stories from the road — what our guests say long after the
            journey home has begun.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="relative bg-card rounded-2xl p-8 shadow-card flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/15" />

              <Stars />

              <h3 className="font-display text-lg font-semibold text-foreground mt-4">
                {testimonial.headline}
              </h3>

              <blockquote className="text-muted-foreground text-sm leading-relaxed mt-3 flex-1">
                "{testimonial.review}"
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-border/60">
                <div className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </div>
                <div className="text-muted-foreground text-xs">
                  {testimonial.trip} · {testimonial.country}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}