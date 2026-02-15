import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryLightboxProps {
  images: string[];
  mainImage: string;
  alt: string;
}

export function ImageGalleryLightbox({ images, mainImage, alt }: ImageGalleryLightboxProps) {
  const allImages = [mainImage, ...images.filter(img => img !== mainImage)];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const goNext = useCallback(() => {
    setSelectedIndex(prev => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  if (allImages.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid gap-3">
        {/* Main large image */}
        <div
          className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-[16/9]"
          onClick={() => openLightbox(0)}
        >
          <img
            src={allImages[0]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-sand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300",
                  "ring-2 ring-offset-2 ring-offset-background",
                  i === selectedIndex && lightboxOpen
                    ? "ring-primary"
                    : "ring-transparent hover:ring-primary/50"
                )}
              >
                <img
                  src={img}
                  alt={`${alt} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {allImages.length > 4 && (
              <button
                onClick={() => openLightbox(0)}
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <span className="text-primary font-semibold text-sm">
                  View All
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-brown/95 border-0 overflow-hidden [&>button]:hidden">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 text-sand hover:text-sand hover:bg-sand/10 rounded-full w-10 h-10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-50 bg-brown/60 backdrop-blur-sm text-sand px-3 py-1.5 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {allImages.length}
          </div>

          {/* Main image area */}
          <div className="flex items-center justify-center w-full h-full p-4 md:p-12">
            <img
              src={allImages[selectedIndex]}
              alt={`${alt} ${selectedIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg animate-fade-in"
              key={selectedIndex}
            />
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-sand hover:text-sand hover:bg-sand/10 rounded-full w-12 h-12"
              >
                <ChevronLeft className="w-7 h-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-50 text-sand hover:text-sand hover:bg-sand/10 rounded-full w-12 h-12"
              >
                <ChevronRight className="w-7 h-7" />
              </Button>
            </>
          )}

          {/* Bottom thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-brown/60 backdrop-blur-sm rounded-full px-3 py-2 max-w-[90vw] overflow-x-auto">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-300",
                    "ring-2 ring-offset-1",
                    i === selectedIndex
                      ? "ring-primary ring-offset-brown/60 scale-110"
                      : "ring-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
