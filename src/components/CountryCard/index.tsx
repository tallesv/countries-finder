import React from 'react';
import Card from 'react-bootstrap/esm/Card';

interface CountryCardProps {
  country: {
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
  };
}

export default function CountryCard({
  country,
}: CountryCardProps): JSX.Element {
  return (
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
        <Card.Text>{`Languages: ${country.languages.map((language, index) =>
          country.languages.length - 1 === index
            ? ` ${language.name}.`
            : ` ${language.name}`,
        )}`}</Card.Text>
        <Card.Text>{`Currencies: ${country.currencies.map((currency, index) =>
          country.currencies.length - 1 === index
            ? `${currency.name ? currency.name : ''} (${
                currency.code ? currency.code : ''
              } ${currency.symbol ? currency.symbol : ''}).`
            : ` ${currency.name} (${currency.code} ${currency.symbol})`,
        )}`}</Card.Text>
      </Card.Body>
    </Card>
  );
}
