import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { SITE_PHONE_DISPLAY, SITE_EMAIL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-brown text-sand/90">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-sand">
              Marrakech Escapes
            </h3>
            <p className="text-sand/70 text-sm leading-relaxed">
              Creating unforgettable Moroccan adventures since 2014. 
              Discover the magic of Morocco with our expert local guides.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-sand">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Excursions', to: '/#excursions' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-sand/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Excursions */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-sand">
              Top Excursions
            </h4>
            <ul className="space-y-3">
              {[
                'Sahara Desert Tour',
                'Atlas Mountains',
                'Essaouira Day Trip',
                'Medina Walking Tour',
              ].map((item) => (
                <li key={item}>
                  <span className="text-sand/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-sand">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sand/70 text-sm">
                  Marrakech, Morocco
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sand/70 text-sm">{SITE_PHONE_DISPLAY}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sand/70 text-sm">{SITE_EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sand/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sand/50 text-sm">
            © {new Date().getFullYear()} Marrakech Escapes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sand/50 hover:text-sand text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sand/50 hover:text-sand text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
