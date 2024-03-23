import React from 'react';

import './App.css';
import BookResults from '../BookResults';
import BookSearch from '../BookSearch';

function App() {
  const [status, setStatus] = React.useState('idle');
  const [results, setResults] = React.useState([]);
  // idle / loading / success / error
  // show response for each status

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Find a book</h1>
      </header>
      <main>
        <BookSearch setResults={setResults} setStatus={setStatus} />
        <BookResults status={status} results={results} />
      </main>
    </div>
  );
}

export default App;
