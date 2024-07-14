import './App.css';

import React, { useState } from 'react';

import  useDebounce  from './custom-hooks/useDebounce';

function App() {
  const [data, setData] = useState(null);
  const loadData = async (event) => {
    const val = event.target.value;
    if (val===''){
      setData(null);
      return;
    }
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${val}`);
      if (response.ok) {
        const res = await response.json();
        setData(res);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };
  const loadDataDebounced = useDebounce(loadData, 400)
  return (
    <div className="App">
      <header className="App-header">
      autocomplete
      <p>
      <input type='text' onChange={loadDataDebounced} />
      <div>
      {data && data.length !== 0 && (
          <div>
            {data.map((country) => (
              <div key={country.cca2}>{country.name.common}</div>
            ))}
          </div>
        )}
      </div>
        
      </p>
      </header>
      
    </div>
  );
}

export default App;
