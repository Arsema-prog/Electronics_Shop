import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import ProductCardSlider from './components/ProductCardSlider';
import Footer from './components/Footer';
import ProductPopup from './components/ProductPopup';
import Laptop from './pages/laptop';
import Phone from './pages/Phone';
import Watch from './pages/watch';
import Perfume from './pages/perfume';
const App = () => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const sliderRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/api_product_details.php ')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (sliderRef.current) {
      sliderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <Navbar onCategoryChange={handleCategoryChange} products={products} onProductSelect={setSelectedProduct} />

      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={
          <>
            <Landing />
            <div ref={sliderRef}>
              <ProductCardSlider category={category} onProductSelect={setSelectedProduct} />
            </div>
          </>
        } />

        {/* Category Pages */}
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/phone" element={<Phone />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/perfume" element={<Perfume />} />

      </Routes>

      <Footer />

      {selectedProduct && <ProductPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </Router>
  );
};

export default App;
