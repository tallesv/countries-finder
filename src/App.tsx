/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from './components/Pagination';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import './styles/global.css';
import api from './services/api';
import CountryCard from './components/CountryCard';

interface Country {
  id: string;
  name: string;
  flag: string;
  languages: {
    name: string;
  }[];
  currencies: {
    name: string | null;
    code: string | null;
    symbol: string | null;
  }[];
}

function App(): JSX.Element {
  const [textSearched, setTextSearched] = useState('');
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const numberOfCountriesDisplay = 12;

  function handleSearchByName() {
    const findCountries = allCountries.filter(country =>
      country.name
        .toLocaleLowerCase()
        .includes(textSearched.toLocaleLowerCase()),
    );

    setCurrentPage(1);
    setTotalPages(Math.round(findCountries.length / numberOfCountriesDisplay));
    setFilteredCountries(findCountries);
  }

  function handleSearchByLanguage() {
    const findCountries = allCountries.filter(country =>
      country.languages.find(language =>
        language.name?.toLowerCase().includes(textSearched.toLowerCase()),
      ),
    );
    setCurrentPage(1);
    setTotalPages(Math.round(findCountries.length / numberOfCountriesDisplay));
    setFilteredCountries(findCountries);
  }

  function handleSearchByCurrency() {
    const findCountries = allCountries.filter(country =>
      country.currencies.find(currency =>
        currency.name?.toLocaleLowerCase().includes(textSearched.toLowerCase()),
      ),
    );
    setCurrentPage(1);
    setTotalPages(Math.round(findCountries.length / numberOfCountriesDisplay));
    setFilteredCountries(findCountries);
  }

  useEffect(() => {
    setIsLoading(true);
    api.get('/all').then(response => {
      const countries = response.data.map(
        (country: Country, index: number) => ({
          ...country,
          id: index,
        }),
      );
      setAllCountries(countries);
      setFilteredCountries(countries);
      setTotalPages(Math.round(countries.length / numberOfCountriesDisplay));
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <SearchInput
          onChangeInputValue={setTextSearched}
          onSearchCountryName={handleSearchByName}
          onSearchCountryLanguage={handleSearchByLanguage}
          onSearchCountryCurrency={handleSearchByCurrency}
        />

        {isLoading && (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {filteredCountries.length === 0 && !isLoading ? (
          <div>No country found 😕</div>
        ) : (
          <section className="content">
            {filteredCountries
              .slice(
                (currentPage - 1) * numberOfCountriesDisplay,
                currentPage * numberOfCountriesDisplay,
              )
              .map(country => (
                <CountryCard key={country.id} country={country} />
              ))}
          </section>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onSelectFirstPage={() => setCurrentPage(1)}
          onSelectPreviousPage={setCurrentPage}
          onSelectPage={setCurrentPage}
          onSelectNextPage={setCurrentPage}
          onSelectLastPage={() => setCurrentPage(totalPages)}
        />
      </main>
    </>
  );
}

export default App;
