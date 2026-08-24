import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight } from 'lucide-react';
import { Excursion } from '@/types/excursion';

interface ExcursionCardProps {
  excursion: Excursion;
}

export function ExcursionCard({ excursion }: ExcursionCardProps) {
  return (
    <Link to={`/excursion/${excursion.id}`} className="group block h-full">
      <Card className="overflow-hidden bg-card border-0 shadow-card group-hover:shadow-elevated transition-all duration-500 group-hover:-translate-y-2 rounded-2xl h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={excursion.imageUrl}
            alt={excursion.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/50 via-transparent to-transparent" />

          {/* Category Badge */}
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 px-3 py-1">
            {excursion.category}
          </Badge>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-4 py-1.5 rounded-full shadow-soft">
            <span className="text-xs text-muted-foreground">From </span>
            <span className="font-display text-lg font-bold text-primary">${excursion.price}</span>
            <span className="text-xs text-muted-foreground"> /person</span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
            {excursion.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-5 flex-1">
            {excursion.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/70">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>From Marrakech</span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground px-3.5 py-1.5 rounded-full transition-all duration-300">
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}