import { useState, useMemo, useEffect } from 'react';
import { useExcursions } from '@/contexts/ExcursionsContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ExcursionCard } from '@/components/ExcursionCard';
import { ExcursionFilters } from '@/components/ExcursionFilters';
import { ExcursionPagination } from '@/components/ExcursionPagination';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Compass } from 'lucide-react';

const categories = ['Desert', 'Mountains', 'Coastal', 'City', 'Nature', 'Culinary', 'Cultural', 'Adventure'];
const ITEMS_PER_PAGE = 9;

export default function Excursions() {
  const { excursions } = useExcursions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { minPrice, maxPrice } = useMemo(() => {
    if (excursions.length === 0) return { minPrice: 0, maxPrice: 500 };
    const prices = excursions.map(e => e.price);
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
  }, [excursions]);

  const availableCategories = useMemo(() => {
    const cats = new Set(excursions.map(e => e.category));
    return categories.filter(c => cats.has(c));
  }, [excursions]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    excursions.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
    return counts;
  }, [excursions]);

  const filteredExcursions = useMemo(() => {
    return excursions.filter(excursion => {
      const matchesSearch = searchQuery === '' ||
        excursion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excursion.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(excursion.category);
      const matchesPrice = excursion.price >= priceRange[0] && excursion.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [excursions, searchQuery, selectedCategories, priceRange]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange]);

  const totalPages = Math.ceil(filteredExcursions.length / ITEMS_PER_PAGE);
  const paginatedExcursions = filteredExcursions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategories.length > 0 ||
    priceRange[0] !== minPrice || priceRange[1] !== maxPrice;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Compass className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wide uppercase">
                All Experiences
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Excursions
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover {excursions.length} handcrafted journeys through Morocco's most captivating destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold text-foreground">Filters</h2>
                  {hasActiveFilters && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      {selectedCategories.length + (searchQuery ? 1 : 0)} active
                    </span>
                  )}
                </div>
                <ExcursionFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategories={selectedCategories}
                  onCategoryToggle={handleCategoryToggle}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  availableCategories={availableCategories}
                  categoryCounts={categoryCounts}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button & Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredExcursions.length}</span> excursions
                </p>

                {/* Mobile Filter Trigger */}
                <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <span className="ml-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {selectedCategories.length + (searchQuery ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="font-display">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <ExcursionFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategories={selectedCategories}
                        onCategoryToggle={handleCategoryToggle}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        availableCategories={availableCategories}
                        categoryCounts={categoryCounts}
                        hasActiveFilters={hasActiveFilters}
                        onClearFilters={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Excursions Grid */}
              {paginatedExcursions.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedExcursions.map((excursion, index) => (
                      <div
                        key={excursion.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ExcursionCard excursion={excursion} />
                      </div>
                    ))}
                  </div>
                  <ExcursionPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-16 bg-card rounded-2xl">
                  <Compass className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No excursions found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
