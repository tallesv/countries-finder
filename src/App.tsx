import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/esm/Card';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import './styles/global.css';

function App(): JSX.Element {
  const [textSearched, setTextSearched] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Header />

      <main>
        <SearchInput onChangeInputValue={setTextSearched} />

        <Card>
          <Card.Body>
            <Card.Title className="title">
              1 -
              <img
                src="https://restcountries.eu/data/afg.svg"
                alt="country flag"
                className="countryFlag"
              />
              Afghanistan
            </Card.Title>
            <Card.Text>Idiomas: Pashto, Uzbek and Turkmen</Card.Text>
            <Card.Text>Moeda: Afghan afghani(EUR €) </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title className="title">
              1 -
              <img
                src="https://restcountries.eu/data/afg.svg"
                alt="country flag"
                className="countryFlag"
              />
              Afghanistan
            </Card.Title>
            <Card.Text>Idiomas: Pashto, Uzbek and Turkmen</Card.Text>
            <Card.Text>Moeda: Afghan afghani(EUR €) </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title className="title">
              1 -
              <img
                src="https://restcountries.eu/data/afg.svg"
                alt="country flag"
                className="countryFlag"
              />
              Afghanistan
            </Card.Title>
            <Card.Text>Idiomas: Pashto, Uzbek and Turkmen</Card.Text>
            <Card.Text>Moeda: Afghan afghani(EUR €) </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title className="title">
              1 -
              <img
                src="https://restcountries.eu/data/afg.svg"
                alt="country flag"
                className="countryFlag"
              />
              Afghanistan
            </Card.Title>
            <Card.Text>Idiomas: Pashto, Uzbek and Turkmen</Card.Text>
            <Card.Text>Moeda: Afghan afghani(EUR €) </Card.Text>
          </Card.Body>
        </Card>

        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active activeLabel="">
            1
          </Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </main>
    </>
  );
}

export default App;
