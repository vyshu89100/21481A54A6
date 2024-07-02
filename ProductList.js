// src/ProductList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState('AMZ'); // Default source
  const [category, setCategory] = useState('phone'); // Default category
  const [topN, setTopN] = useState(5); // Default top N products

  useEffect(() => {
    // Fetch products data from API based on source and category
    axios.get(`http://localhost:3001/products?source=${source}&category=${category}&_limit=${topN}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [source, category, topN]);

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTopNChange = (e) => {
    setTopN(e.target.value);
  };

  return (
    <div className="product-list">
      <h2>Top {topN} Products</h2>
      <div>
        <label>Select source:</label>
        <select value={source} onChange={handleSourceChange}>
          <option value="AMZ">AMZ</option>
          <option value="FLP">FLP</option>
          <option value="SNP">SNP</option>
          <option value="MYN">MYN</option>
          <option value="AZO">AZO</option>
        </select>
      </div>
      <div>
        <label>Select category:</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
          <option value="laptop">Laptop</option>
          <option value="pc">PC</option>
          <option value="remote">Remote</option>
          <option value="speaker">Speaker</option>
          <option value="headset">Headset</option>
          <option value="earphone">Earphone</option>
          <option value="Charger">Chargerr</option>
          <option value="Tablet">Tablet</option>
          <option value="Keypad">Keypad</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="Pendrive">Pendrive</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label>Select top N:</label>
        <input type="number" value={topN} onChange={handleTopNChange} min="1" />
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Price: {product.price}, Rating: {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
