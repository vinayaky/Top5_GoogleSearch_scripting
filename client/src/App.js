// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search/?q=${query}`);
      setResults(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1>Custom Search App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map((text, index) => (
          <div key={index}>
            <h3>Result {index + 1}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
