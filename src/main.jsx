import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from '../router.jsx'
import { RouterProvider } from 'react-router'
import { CartProvider } from './context/CartContext.jsx'
import { PRODUCTS } from './services/products.js'

const PRODUCTS_BY_CODE = Object.fromEntries(PRODUCTS.map(p => [p.code, p]));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider productsByCode={PRODUCTS_BY_CODE}>
      <RouterProvider router={router} />
    </CartProvider>

  </StrictMode>,
)
