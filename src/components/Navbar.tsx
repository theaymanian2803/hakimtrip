import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Compass } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome ? 'bg-card/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Compass
              className={`w-8 h-8 ${isScrolled || !isHome ? 'text-primary' : 'text-sand'}`}
            />
            <span
              className={`font-display text-xl font-bold ${isScrolled || !isHome ? 'text-foreground' : 'text-sand'}`}>
              MTC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isScrolled || !isHome
                  ? 'text-foreground hover:text-primary'
                  : 'text-sand hover:text-gold'
              }`}>
              Home
            </Link>
            <Link
              to="/excursions"
              className={`text-sm font-medium transition-colors ${
                isScrolled || !isHome
                  ? 'text-foreground hover:text-primary'
                  : 'text-sand hover:text-gold'
              }`}>
              Excursions
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isScrolled || !isHome
                  ? 'text-foreground hover:text-primary'
                  : 'text-sand hover:text-gold'
              }`}>
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isScrolled || !isHome
                  ? 'text-foreground hover:text-primary'
                  : 'text-sand hover:text-gold'
              }`}>
              Contact
            </Link>
            <Button
              asChild
              className="bg-primary hover:bg-terracotta-dark text-primary-foreground rounded-full px-6">
              <Link to="/excursions">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled || !isHome ? 'text-foreground' : 'text-sand'}`}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-foreground font-medium py-2">
                Home
              </Link>
              <Link to="/excursions" className="text-foreground font-medium py-2">
                Excursions
              </Link>
              <Link to="/about" className="text-foreground font-medium py-2">
                About
              </Link>
              <Link to="/contact" className="text-foreground font-medium py-2">
                Contact
              </Link>
              <Button
                asChild
                className="bg-primary hover:bg-terracotta-dark text-primary-foreground rounded-full mt-2">
                <Link to="/excursions">Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
