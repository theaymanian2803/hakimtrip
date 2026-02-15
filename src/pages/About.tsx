import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  MapPin, Users, Calendar, Tag, Car, Globe, Mountain, Star,
  Tent, UtensilsCrossed, Footprints, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react';

const stats = [
  { icon: MapPin, value: '500+', label: 'Locations' },
  { icon: Users, value: '200K', label: 'Travelers' },
  { icon: Calendar, value: '20', label: 'Years of Service' },
  { icon: Tag, value: '100+', label: 'Best Deals' },
];

const accommodations = [
  'Luxury villas & authentic Moroccan riads',
  'Charming countryside farms & palm grove retreats',
  'Boutique hotels & premium accommodations in prime locations',
];

const services = [
  'Private chauffeur-driven transfers (VIP vehicles available)',
  'Comfortable public transportation options',
  'Multi-lingual driver-guides for seamless experiences',
];

const highlights = [
  'Imperial cities & vibrant historic markets',
  'Atlas Mountains & lush palm oases',
  'Ancient kasbahs & desert fortresses',
  'Golden Atlantic beaches & coastal towns',
];

const saharaFeatures = [
  { icon: Tent, text: 'Luxury desert camp with premium amenities' },
  { icon: Footprints, text: 'Camel trek at sunset through Erg Chebbi dunes' },
  { icon: UtensilsCrossed, text: 'Gourmet Berber cuisine under starry skies' },
  { icon: Star, text: 'Exclusive desert activities' },
];

const whyChooseUs = [
  'End-to-end transportation solutions (private/public)',
  'Curated accommodation portfolio from luxury to traditional',
  '100% customizable itineraries',
  'Local expertise with international standards',
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wide uppercase">
                About Us
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              MoroccoTourCravers – Your Premium Moroccan Travel Experience
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our tours include a variety of styles to suit different preferences, such as backpacking and car camping. We specialize in crafting tailor-made private tours across Morocco, offering unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-0 shadow-card rounded-2xl text-center">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations & Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Accommodations */}
            <Card className="border-0 shadow-card rounded-2xl">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Mountain className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Unforgettable Stays
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We offer handpicked accommodations across Morocco for every taste.
                </p>
                <ul className="space-y-4">
                  {accommodations.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="border-0 shadow-card rounded-2xl">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Local Travel Experts
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  As licensed drivers and guides, we provide seamless travel solutions.
                </p>
                <ul className="space-y-4">
                  {services.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Destinations Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              We Offer Tours in a Range of Locations
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover Morocco's highlights across diverse landscapes and cultures.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {highlights.map((item) => (
              <Card key={item} className="border-0 shadow-card rounded-2xl text-center">
                <CardContent className="p-6">
                  <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="text-foreground text-sm font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sahara Experience */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-elevated rounded-2xl overflow-hidden bg-gradient-to-br from-card to-primary/5">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Our Signature Sahara Experience
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Most itineraries feature our exclusive desert experience — the highlight of any Moroccan journey.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {saharaFeatures.map((feature) => (
                    <div key={feature.text} className="flex items-start gap-4 bg-background/60 rounded-xl p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-foreground text-sm font-medium">{feature.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {whyChooseUs.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Turn Your Moroccan Dream Into Reality!
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Contact us today to design your perfect journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 h-auto text-base">
              <Link to="/contact">
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-3 h-auto text-base">
              <Link to="/excursions">Browse Excursions</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
