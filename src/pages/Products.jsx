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
              <span className="text-rose-500">Balloon</span>
              <span className="text-gray-700"> Flower</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            <li>
              <Link to="/" className="text-gray-600 hover:text-rose-500 text-sm lg:text-base transition-all duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rose-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-rose-500 text-sm lg:text-base transition-all duration-300 relative">
                Products
                <span className="absolute -bottom-1 left-0 w-full h-px bg-rose-400"></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-rose-500 text-sm lg:text-base transition-all duration-300 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rose-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-rose-500 hover:text-rose-600 transition-colors p-2"
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
            className="text-gray-700 hover:text-rose-500 hover:bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-rose-500 bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg"
          >
            Products
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-rose-500 hover:bg-rose-50/50 text-base transition-all px-4 py-3 rounded-lg"
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

export default function Products() {
  const [sortBy, setSortBy] = useState('featured')
  const [filterPrice, setFilterPrice] = useState('all')
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    let filtered = [...PRODUCTS]

    // Filter by price
    if (filterPrice === 'low') {
      filtered = filtered.filter(p => p.price < 150000)
    } else if (filterPrice === 'medium') {
      filtered = filtered.filter(p => p.price >= 150000 && p.price < 250000)
    } else if (filterPrice === 'high') {
      filtered = filtered.filter(p => p.price >= 250000)
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setProducts(filtered)
  }, [sortBy, filterPrice])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-amber-50/30">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-20 sm:pt-22 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f43f5e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-block mb-2 sm:mb-3">
            <span className="inline-flex items-center px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] uppercase tracking-[0.2em] border border-rose-100">
              Valentine's Collection
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2 sm:mb-3">
            <span className="text-gray-900">Our Signature </span>
            <span className="italic bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent font-medium">
              Bouquets
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Handcrafted with love, delivered with care.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters Bar */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-rose-100/50 shadow-sm p-3 sm:p-4 mb-5 sm:mb-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Results Count */}
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base text-gray-700">
                  Showing <span className="font-serif font-medium text-rose-600">{products.length}</span> {products.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Price Filter */}
                <div className="flex-1 sm:flex-none">
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm border border-rose-200 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under ₹1,500</option>
                    <option value="medium">₹1,500 - ₹2,500</option>
                    <option value="high">Above ₹2,500</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 text-xs sm:text-sm border border-rose-200 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-rose-50 hover:border-rose-200 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 sm:h-60 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Limited Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-md">
                      Limited
                    </div>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Link 
                        to={`/order?product_id=${product.id}`}
                        className="bg-white text-rose-600 px-4 py-2 rounded-full text-xs font-medium hover:bg-rose-50 transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        Quick Order
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-serif text-gray-800 mb-1.5 group-hover:text-rose-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg sm:text-xl font-serif text-rose-600">
                        {formatRupees(product.price)}
                      </p>
                      <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    
                    <Link 
                      to={`/order?product_id=${product.id}`} 
                      className="block w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white text-center py-2 sm:py-2.5 rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      Order Now ❤️
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-rose-50 rounded-full mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-gray-700 mb-2">No products found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={() => {
                  setFilterPrice('all')
                  setSortBy('featured')
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Delivery Banner */}
          <div className="mt-16 sm:mt-20 lg:mt-24 animate-fade-in-up">
            <div className="relative h-48 sm:h-56 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              {/* Background Image */}
              <img 
                src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80" 
                alt="Jaipur City" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600/90 via-pink-600/85 to-rose-600/90"></div>
              
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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