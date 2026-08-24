import { Shield, Heart, Users, Star } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Reliable',
    description: 'Licensed guides, insured vehicles, and 24/7 support ensure your peace of mind throughout every journey.',
  },
  {
    icon: Heart,
    title: 'Authentic Experiences',
    description: 'We connect you with local communities, traditions, and hidden gems that mass tourism never sees.',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate group sizes mean personalized attention and the flexibility to explore at your own pace.',
  },
  {
    icon: Star,
    title: 'Expert Local Guides',
    description: 'Our passionate Moroccan guides share insider knowledge, stories, and the warmest hospitality.',
  },
];

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '5,000+', label: 'Happy Travelers' },
  { value: '50+', label: 'Unique Tours' },
  { value: '4.9', label: 'Average Rating' },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose{' '}
            <span className="text-primary">Marrakech Escapes</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            With over a decade of experience, we've perfected the art of creating
            unforgettable Moroccan adventures.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="w-8 h-px bg-gold mx-auto mb-4 group-hover:w-14 transition-all duration-300" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative mt-24 grid grid-cols-2 lg:grid-cols-4 gap-y-12 p-10 md:p-14 rounded-3xl bg-primary overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full border border-primary-foreground/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-12 w-48 h-48 rounded-full border border-primary-foreground/10 pointer-events-none" />

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative text-center px-6 ${index > 0 ? 'lg:border-l lg:border-primary-foreground/15' : ''}`}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="w-4 h-px bg-gold" />
                <span className="text-primary-foreground/85 text-sm tracking-wide">
                  {stat.label}
                </span>
                <span className="w-4 h-px bg-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}