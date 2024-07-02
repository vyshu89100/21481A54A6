// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/calculate-average', { numbers: numbers.split(',') });
      setAverage(response.data.average.toFixed(2));
    } catch (error) {
      console.error('Error calculating average:', error);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <div>
        <label>Enter numbers separated by commas:</label>
        <input type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} />
        <button onClick={handleCalculate}>Calculate Average</button>
      </div>
      {average && (
        <div>
          <h2>Average:</h2>
          <p>{average}</p>
        </div>
      )}
    </div>
  );
}

export default App;
