import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import Product from './components/Product/Product';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import MainProduct from './components/Product/MainProduct';
import ProductPage from './components/Product/MainProduct';

function App() {
  return (
    <Router>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path='/product/:productId' element={<MainProduct />} />
          
        </Routes>
      </Header>
    </Router>
  );
}

export default App;
