import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PRODUCTS from '../data/products'

function formatRupees(paise){
  return `₹${(paise/100).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100/30' 
        : 'bg-white/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-wide">
              <span style={{color: '#d35f70'}}>Balloon</span>
              <span className="text-gray-700"> Flower</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            <li>
              <Link to="/" className="text-gray-600 text-sm lg:text-base transition-all duration-300 relative group hover-text-primary">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{background: '#d35f70'}}></span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 text-sm lg:text-base transition-all duration-300 relative group hover-text-primary">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{background: '#d35f70'}}></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 text-sm lg:text-base transition-all duration-300 relative group hover-text-primary">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{background: '#d35f70'}}></span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden transition-colors p-2"
            style={{color: '#d35f70'}}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-y-0 right-0 w-72 bg-white/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-1 p-6 pt-20">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg hover-text-primary"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg hover-text-primary"
          >
            Products
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg hover-text-primary"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  )
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2026-02-14T00:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up px-4">
      <div className="bg-white/40 backdrop-blur-sm rounded-xl border shadow-sm p-4 sm:p-5" style={{borderColor: 'rgba(211, 95, 112, 0.2)'}}>
        <p className="text-center text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 sm:mb-4" style={{color: '#d35f70'}}>
          Offer Ends In
        </p>
        
        <div className="flex justify-center items-center gap-3 sm:gap-4">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif tabular-nums" style={{color: '#d35f70'}}>
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
              Days
            </span>
          </div>

          <span className="text-xl sm:text-2xl md:text-3xl font-serif" style={{color: 'rgba(211, 95, 112, 0.4)'}}>:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif tabular-nums" style={{color: '#d35f70'}}>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
              Hours
            </span>
          </div>

          <span className="text-xl sm:text-2xl md:text-3xl font-serif" style={{color: 'rgba(211, 95, 112, 0.4)'}}>:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif tabular-nums" style={{color: '#d35f70'}}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
              Mins
            </span>
          </div>

          <span className="text-xl sm:text-2xl md:text-3xl font-serif" style={{color: 'rgba(211, 95, 112, 0.4)'}}>:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif tabular-nums" style={{color: '#d35f70'}}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
              Secs
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{background: '#fdf3f5'}}>
      <Navbar />
      
      {/* Hero Section - 100vh */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f43f5e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-left space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] border" style={{background: 'rgba(211, 95, 112, 0.1)', color: '#d35f70', borderColor: 'rgba(211, 95, 112, 0.3)'}}>
                  Valentine's Exclusive
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span className="text-gray-900 font-serif font-normal">Love, </span>
                <span className="italic font-serif font-medium" style={{background: 'linear-gradient(to right, #d35f70, #d35f70)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                  Elevated.
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl">
                Express your deepest emotions with our signature Balloon Flower Bouquet. A timeless gesture of romance, crafted for unforgettable moments.
              </p>

              {/* CTA and Rating */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <Link 
                  to="/products" 
                  className="group inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 text-white rounded-full text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  style={{background: '#d35f70'}}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#c2515f'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#d35f70'}
                >
                  Order Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <div className="flex items-center gap-2">
                  <div className="flex text-sm" style={{color: '#c4a459'}}>
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Right Content - Product Cards */}
            <div className="relative animate-fade-in-right order-1 lg:order-2">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-rose-200 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse-slow" style={{animationDelay: '1s'}}></div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 gap-4 sm:gap-5">
                {PRODUCTS.slice(0, 2).map((product, index) => (
                  <div 
                    key={product.id}
                    className="group bg-gradient-to-br from-white/70 to-rose-50/50 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h3 className="text-base sm:text-lg font-serif text-gray-800 mb-1 group-hover:text-rose-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-lg sm:text-xl font-serif" style={{color: '#d35f70'}}>
                            {formatRupees(product.price)}
                          </p>
                          <div className="flex text-xs" style={{color: '#c4a459'}}>
                            {'★'.repeat(5)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Button */}
                    <Link 
                      to={`/order?product_id=${product.id}`}
                      className="block w-full text-white text-center py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-300"
                      style={{background: '#d35f70'}}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#c2515f'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#d35f70'}
                    >
                      Order Now ❤️
                    </Link>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <Link 
                to="/products"
                className="mt-4 sm:mt-5 block text-center text-sm transition-colors group"
                style={{color: '#d35f70'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#c2515f'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#d35f70'}
              >
                View All Products
                <svg className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow hidden sm:flex">
          <div className="flex flex-col items-center gap-2 text-rose-400">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-14 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-2 sm:mb-3" style={{background: 'linear-gradient(to right, #d35f70, #d35f70)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Our Valentine's Collection
            </h2>
            <p className="text-sm sm:text-base lg:text-lg font-serif italic text-gray-600 max-w-2xl mx-auto px-4">
              A delicate burst of love — choose a bouquet
            </p>
          </div>

          {/* Countdown */}
          <Countdown />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {PRODUCTS.map((product, index) => (
              <div 
                key={product.id}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-rose-50 hover:border-rose-200 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Limited Badge */}
                  <div className="absolute top-3 right-3 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-md" style={{background: '#d35f70'}}>
                    Limited
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-1.5 sm:mb-2 group-hover:transition-colors" style={{transition: 'color 0.3s'}} 
                    onMouseEnter={(e) => e.currentTarget.style.color = '#d35f70'} 
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                    {product.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl sm:text-2xl font-serif" style={{color: '#d35f70'}}>
                      {formatRupees(product.price)}
                    </p>
                    <div className="flex text-xs sm:text-sm" style={{color: '#c4a459'}}>
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/order?product_id=${product.id}`} 
                    className="block w-full text-white text-center py-2.5 sm:py-3 rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                    style={{background: '#d35f70'}}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c2515f'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#d35f70'}
                  >
                    Order Now ❤️
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Banner */}
          <div className="mt-16 sm:mt-20 lg:mt-24 mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
            <div className="relative h-48 sm:h-56 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              {/* Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80" 
                alt="Jaipur City" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(211, 95, 112, 0.9), rgba(211, 95, 112, 0.85), rgba(211, 95, 112, 0.9))'}}></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  {/* Main Text */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
                    Delivering Exclusively in Jaipur
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto">
                    Hand-delivered with care to your doorstep across the Pink City
                  </p>
                  
                  {/* Decorative Line */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-8 sm:w-12 h-px bg-white/40"></div>
                    <span className="text-white/60 text-xs sm:text-sm">❤</span>
                    <div className="w-8 sm:w-12 h-px bg-white/40"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-rose-100 animate-fade-in">
            <p className="text-sm sm:text-base font-serif italic text-gray-600 mb-1.5 sm:mb-2">
              Hand-delivered with whispers of love ✨
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              © 2026 Balloon Flower. All rights reserved.
            </p>
          </footer>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .font-serif {
          font-family: 'Lora', serif;
        }

        body {
          font-family: 'Montserrat', sans-serif;
        }

        .hover-text-primary:hover {
          color: #d35f70;
        }

        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.3s;
          animation-fill-mode: both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}