import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/esm/Card';
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
    api.get('/all').then(response => {
      const countries = response.data.map(
        (country: Country, index: number) => ({
          ...country,
          id: index,
        }),
      );
      setAllCountries(countries);
      setFilteredCountries(countries);
      setTotalPages(countries.length / 10);
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

        {filteredCountries.length === 0 ? (
          <div>No country found 😕</div>
        ) : (
          filteredCountries
            .slice((currentPage - 1) * 10, currentPage * 10)
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
            ))
        )}

        <Pagination>
          <Pagination.First disabled={currentPage === 1} />
          <Pagination.Prev disabled={currentPage === 1} />
          <Pagination.Item active activeLabel="">
            1
          </Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </main>
    </>
  );
}

export default App;
