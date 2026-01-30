import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎈</span>
          <span className="logo-text">Balloon Flower</span>
        </Link>
        
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="hero" style={{minHeight: 'calc(100vh - 70px)'}}>
        <section className="overlay">
          <header className="brand">
            <h1>About Us</h1>
            <p className="sub">Crafting moments that bloom with love</p>
          </header>

          <div style={{
            maxWidth: '700px',
            margin: '3rem auto',
            background: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 6px 30px rgba(180,120,130,0.08)',
            textAlign: 'left',
            lineHeight: '1.8'
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.15rem',
              color: '#6b4b52',
              marginBottom: '1.5rem'
            }}>
              At Balloon Flower, we believe that love deserves to be celebrated in the most extraordinary ways. Each bouquet is a carefully curated expression of affection, combining the whimsical charm of balloons with the timeless elegance of floral artistry.
            </p>

            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.15rem',
              color: '#6b4b52',
              marginBottom: '1.5rem'
            }}>
              Our Valentine's collection is exclusively designed for those who seek something beyond the ordinary. We handcraft each piece with meticulous attention to detail, ensuring that your gesture of love is as unique as the person receiving it.
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #fff6f7, #fff)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginTop: '2rem',
              border: '1px solid rgba(180, 57, 75, 0.12)'
            }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: '#B4394B',
                marginBottom: '1rem',
                fontSize: '1.3rem'
              }}>Our Promise</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{marginBottom: '0.75rem', color: '#6b4b52'}}>
                  ❤️ Hand-delivered with care and discretion
                </li>
                <li style={{marginBottom: '0.75rem', color: '#6b4b52'}}>
                  🎈 Premium quality balloons and fresh florals
                </li>
                <li style={{marginBottom: '0.75rem', color: '#6b4b52'}}>
                  ✨ Personalized messages included
                </li>
                <li style={{marginBottom: '0.75rem', color: '#6b4b52'}}>
                  💝 Limited Valentine's collection
                </li>
              </ul>
            </div>

            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1rem',
              color: '#7b5458',
              marginTop: '2rem',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              "Every bouquet tells a story. Let us help you write yours."
            </p>
          </div>

          <footer className="credits">Hand-delivered with whispers of love ✨</footer>
        </section>
      </main>
    </>
  )
}