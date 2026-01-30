import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-rose-100' 
        : 'bg-white/90 backdrop-blur-md border-b border-rose-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <span className="text-2xl sm:text-3xl animate-bounce-slow">🎈</span>
            <span className="text-xl sm:text-2xl font-playfair font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Balloon Flower
            </span>
          </Link>
          
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            <li>
              <Link to="/" className="text-gray-700 hover:text-rose-600 font-medium transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-700 hover:text-rose-600 font-medium transition-all duration-300 relative group">
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-rose-600 font-medium transition-all duration-300 relative group">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-rose-600 hover:text-rose-700 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed inset-y-0 right-0 w-64 bg-gradient-to-br from-rose-50 via-pink-50 to-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col gap-6 p-8 pt-20">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-rose-600 font-medium transition-colors py-2 border-b border-rose-100">
            Home
          </Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-rose-600 font-medium transition-colors py-2 border-b border-rose-100">
            Products
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-700 hover:text-rose-600 font-medium transition-colors py-2 border-b border-rose-100">
            About Us
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  )
}

function ProductCarousel({ onAddToCart, cartItems }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, PRODUCTS.length - itemsPerView + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, PRODUCTS.length - itemsPerView + 1)) % Math.max(1, PRODUCTS.length - itemsPerView + 1))
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 mb-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-800">
          Add More Products
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {PRODUCTS.map((product) => (
            <div key={product.id} className="min-w-[calc(33.333%-0.67rem)] flex-shrink-0">
              <div className="group bg-gradient-to-br from-rose-50/30 to-pink-50/20 rounded-xl border border-rose-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {isInCart(product.id) && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      ✓ In Cart
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-playfair font-semibold text-sm sm:text-base text-gray-800 mb-1 line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-lg sm:text-xl font-playfair font-bold text-rose-600 mb-2">
                    {formatRupees(product.price)}
                  </p>
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${
                      isInCart(product.id)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Order() {
  const [params] = useSearchParams()
  const product_id_param = params.get('product_id')
  const initialProduct = PRODUCTS.find(p => p.id === product_id_param) || PRODUCTS[0]

  const [cartItems, setCartItems] = useState([{ ...initialProduct, quantity: 1 }])
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', message: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const addToCart = (product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const advance = Math.round(subtotal / 2)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)

    const body = { 
      ...form, 
      items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity }))
    }
    
    const res = await fetch('/api/order', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body) 
    })
    const data = await res.json()
    setLoading(false)

    if (data.payu_url && data.params) {
      const formEl = document.createElement('form')
      formEl.method = 'POST'
      formEl.action = data.payu_url
      for (const k in data.params) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = data.params[k]
        formEl.appendChild(input)
      }
      document.body.appendChild(formEl)
      formEl.submit()
      return
    }

    if (data.id) navigate(`/confirmation?order_id=${data.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      <Navbar />
      
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent mb-3">
              Your Shopping Cart
            </h1>
            <p className="text-base sm:text-lg font-cormorant text-gray-600">
              50% online advance • 50% on delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Product Carousel */}
              <ProductCarousel onAddToCart={addToCart} cartItems={cartItems} />

              {/* Cart Items */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-800 mb-6 pb-4 border-b border-rose-100">
                  Cart Items ({cartItems.length})
                </h3>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="flex gap-4 items-center p-4 bg-gradient-to-br from-rose-50/30 to-pink-50/20 rounded-xl hover:shadow-md transition-all" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-playfair font-semibold text-rose-700 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-lg sm:text-xl font-playfair font-bold text-rose-600">
                          {formatRupees(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-rose-200 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded flex items-center justify-center hover:bg-rose-100 transition-colors text-rose-600 font-bold"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded flex items-center justify-center hover:bg-rose-100 transition-colors text-rose-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors text-red-600"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {cartItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 font-cormorant text-lg">Your cart is empty</p>
                  </div>
                )}
              </div>

              {/* Customer Details Form */}
              <form onSubmit={submit} className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-800 mb-6 pb-4 border-b border-rose-100">
                  Delivery Details
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none"
                      placeholder="Enter complete delivery address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message for Recipient <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none"
                      placeholder="Add a personal message..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8 sticky top-24 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-800 mb-6 pb-4 border-b border-rose-100">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <span className="text-gray-600 font-cormorant flex-1">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-playfair font-medium text-gray-800">
                        {formatRupees(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-rose-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-medium">Subtotal:</span>
                      <span className="text-xl font-playfair font-bold text-gray-800">
                        {formatRupees(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg mb-3">
                      <span className="text-gray-700 font-medium">Online Advance (50%):</span>
                      <span className="text-xl font-playfair font-bold text-rose-600">
                        {formatRupees(advance)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-cormorant">Pay on Delivery:</span>
                      <span className="text-lg font-playfair font-semibold text-gray-800">
                        {formatRupees(advance)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={submit}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white py-4 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${formatRupees(advance)} Now ❤️`
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mb-6 font-cormorant">
                  You'll pay remaining {formatRupees(advance)} on delivery
                </p>

                {/* Features */}
                <div className="space-y-3 pt-6 border-t border-rose-100">
                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-600 font-cormorant">Hand-delivered with care</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-600 font-cormorant">Fresh & premium quality</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-600 font-cormorant">Secure payment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-rose-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-600 font-cormorant">Personal message included</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-rose-100 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
                    <span className="text-lg">🔒</span>
                    <span className="text-xs font-medium text-rose-700 uppercase tracking-wider">
                      Secure Checkout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Playfair+Display:wght@400;600;700;800&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}