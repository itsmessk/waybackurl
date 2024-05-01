import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:5000/api/fetch', { url });
      setResults(response.data.waybackurls);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Wayback URL Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Fetch URLs</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.length > 0 ? (
          results.map((link, index) => (
            <div key={index}>{link}</div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
