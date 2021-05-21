import React, { useState } from 'react';
import SearchInput from './components/SearchInput';
import './styles/global.css';

function App(): JSX.Element {
  const [textSearched, setTextSearched] = useState('');
  return (
    <>
      <main>
        <SearchInput onChangeInputValue={setTextSearched} />

        {textSearched}
      </main>
    </>
  );
}

export default App;
