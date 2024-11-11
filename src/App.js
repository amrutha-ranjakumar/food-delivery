import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import About from './pages/About';
import Card from './pages/Card';
import Auth from './pages/Auth';
import Order from './components/Order';
import MyOrder from './pages/MyOrder';
import Wishlist from './pages/Wishlist';
import { UserProvider } from './context/UserContext';

function App() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/';

  return (
    <div>
      <UserProvider>
        {!isAboutPage && <Header />}
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth register={"register"} />} />
          <Route path="/card" element={<Card />} />
          <Route path="/order" element={<Order />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
