/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from './components/Pagination';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import './styles/global.css';
import api from './services/api';

interface Country {
  id: string;
  name: string;
  flag: string;
  languages: {
    name: string;
  }[];
  currencies: {
    name: string;
    code: string;
    symbol: string;
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

  function handleSearchItem() {
    const findCountries = allCountries.filter(country =>
      country.name
        .toLocaleLowerCase()
        .includes(textSearched.toLocaleLowerCase()),
    );
    setCurrentPage(1);
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
          onClickButton={handleSearchItem}
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
                <Card key={country.name}>
                  <Card.Body>
                    <Card.Title className="title">
                      {country.id + 1} -
                      <img
                        src={country.flag}
                        alt={`${country.flag} flag`}
                        className="countryFlag"
                      />
                      {country.name}
                    </Card.Title>
                    <Card.Text>{`Languages: ${country.languages.map(
                      (language, index) =>
                        country.languages.length - 1 === index
                          ? ` ${language.name}.`
                          : ` ${language.name}`,
                    )}`}</Card.Text>
                    <Card.Text>{`Currencies: ${country.currencies.map(
                      (currency, index) =>
                        country.currencies.length - 1 === index
                          ? ` ${currency.name} (${currency.code} ${currency.symbol}).`
                          : ` ${currency.name} (${currency.code} ${currency.symbol})`,
                    )}`}</Card.Text>
                  </Card.Body>
                </Card>
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
