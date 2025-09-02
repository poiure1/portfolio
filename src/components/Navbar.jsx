import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import portfolioData from '../data/portfolioData.json'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { navigation } = portfolioData

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false) // Close mobile menu on route change
  }, [location])

  const handleLogoClick = () => {
    // Scroll to top when logo is clicked
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link 
            to="/portfolio/" 
            onClick={handleLogoClick}
            className="text-2xl lg:text-3xl font-bold text-primary-500 hover:text-primary-400 transition-all duration-300 transform hover:scale-105"
          >
            {navigation.brand}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navigation.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-lg transition-all duration-300 hover:text-primary-500 py-2 transform hover:scale-105 group ${
                  location.pathname === link.path 
                    ? 'text-primary-500' 
                    : 'text-gray-700'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full animate-slideInFromLeft"></span>
                )}
                {/* Hover underline for non-active links */}
                {location.pathname !== link.path && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 space-y-3 border-t border-gray-200">
            {navigation.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  location.pathname === link.path 
                    ? 'text-primary-500 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
