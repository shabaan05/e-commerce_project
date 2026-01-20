import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrdersProvider } from "./context/OrdersContext";
import { ProductProvider } from './context/ProductContext.jsx';
import { CategoryProvider } from "./context/CategoryContext";

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <CartProvider>
<AuthProvider>
  <OrdersProvider>
<ProductProvider>
 <CategoryProvider>
      <App />
    </CategoryProvider>  
</ProductProvider>
        </OrdersProvider>
</AuthProvider>
    </CartProvider>
  </BrowserRouter>
)
