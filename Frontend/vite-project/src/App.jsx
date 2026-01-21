import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Navbar from './component/common/Navbar'
import Footer from './component/common/Footer';
import ProductDetails from './pages/ProductDetails'
import Checkout from "./pages/Checkout";
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Register from './pages/Register';
import ProtectedRoute from './component/routes/ProtectedRoute'
import Profile from './pages/Profile';
function App() {

  return (
    <>
    <Navbar />
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={
        <ProtectedRoute> <Cart /></ProtectedRoute>
        } />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
       <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
       <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/checkout" element={
    <ProtectedRoute> <Checkout /> </ProtectedRoute> } />
  <Route path="/payment" element={<Payment />} />
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>


    </Routes>
        <Footer />

    </>
  )
}

export default App
