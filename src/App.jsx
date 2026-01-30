import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'
import Confirmation from './pages/Confirmation'
import Products from './pages/Products'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
