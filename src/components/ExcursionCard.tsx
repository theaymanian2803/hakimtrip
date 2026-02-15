import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Excursion } from '@/types/excursion';

interface ExcursionCardProps {
  excursion: Excursion;
}

export function ExcursionCard({ excursion }: ExcursionCardProps) {
  return (
    <Link to={`/excursion/${excursion.id}`}>
      <Card className="group overflow-hidden bg-card border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 rounded-2xl">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={excursion.imageUrl}
            alt={excursion.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 px-3 py-1">
            {excursion.category}
          </Badge>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
            ${excursion.price}
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {excursion.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {excursion.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>From Marrakech</span>
            </div>
            
            <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
