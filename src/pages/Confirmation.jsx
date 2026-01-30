import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import PRODUCTS from '../data/products'


function findProduct(pid){
  return PRODUCTS.find(p => p.id === pid)
}

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

export default function Confirmation() {
  const [params] = useSearchParams()
  const order_id = params.get('order_id')
  const statusParam = params.get('status')
  const [status, setStatus] = useState('Verifying…')
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    async function fetchOrder(){
      if (order_id) {
        const res = await fetch(`/api/order/${order_id}`)
        const data = await res.json()
        if (!res.ok && data.error) {
          setStatus('Order not found')
          return
        }
        // message may be JSON with product_id
        let productInfo = null
        try {
          const m = JSON.parse(data.message || '{}')
          if (m && m.product_id) productInfo = findProduct(m.product_id)
        } catch(e){/* ignore */}

        setOrder({ ...data, productInfo })
        setStatus(data.payment_status === 'PARTIALLY_PAID' ? 'Payment received — PARTIALLY PAID' : (statusParam ? `Payment status: ${statusParam}` : 'Order received — awaiting payment'))
      } else {
        setStatus('No order information.')
      }
    }
    fetchOrder()
  }, [order_id, statusParam])

  return (
    <>
      <Navbar />
      <main className="confirmation">
        <div className="confirm-card">
          <h2>Thank you ❤️</h2>
          <p className="status">{status}</p>
          <p className="poem">Your bouquet is being arranged with care. We'll call to confirm delivery details.</p>
          {order && (
            <div style={{marginTop:'2rem', fontSize:'0.95rem',color:'#6b4b52',textAlign:'left',background:'#fff6f7',padding:'1.5rem',borderRadius:'12px'}}>
              <div style={{marginBottom:'0.5rem'}}><strong>Order ID:</strong> {order.id}</div>
              <div style={{marginBottom:'0.5rem'}}><strong>Name:</strong> {order.name}</div>
              <div style={{marginBottom:'0.5rem'}}><strong>Payment Status:</strong> {order.payment_status}</div>
              {order.productInfo && (
                <div style={{marginTop:'0.75rem',paddingTop:'0.75rem',borderTop:'1px solid rgba(180,57,75,0.15)'}}>
                  <strong>Product:</strong> {order.productInfo.name}
                </div>
              )}
            </div>
          )}
          <Link to="/" style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.75rem 1.75rem',
            background: 'linear-gradient(135deg, #B4394B, #8b2f36)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}>
            Back to Home
          </Link>
        </div>
      </main>
    </>
  )
}