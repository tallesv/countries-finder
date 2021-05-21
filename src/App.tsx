import React, { useState } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import './styles/global.css';

function App(): JSX.Element {
  const [textSearched, setTextSearched] = useState('');
  return (
    <>
      <Header />

      <main>
        <SearchInput onChangeInputValue={setTextSearched} />

        {textSearched}
      </main>
    </>
  );
}

export default App;
