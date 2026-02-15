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

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center p-8 rounded-2xl bg-background hover:bg-secondary transition-all duration-300 shadow-soft hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-3xl bg-primary text-primary-foreground">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '5,000+', label: 'Happy Travelers' },
            { value: '50+', label: 'Unique Tours' },
            { value: '4.9', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
