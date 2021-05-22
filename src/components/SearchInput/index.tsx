import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';

interface SearchInputProps {
  onChangeInputValue: (value: string) => void;
  onSearchCountryName: () => void;
  onSearchCountryLanguage: () => void;
  onSearchCountryCurrency: () => void;
}

export default function SearchInput({
  onChangeInputValue,
  onSearchCountryName,
  onSearchCountryLanguage,
  onSearchCountryCurrency,
}: SearchInputProps): JSX.Element {
  const [type, setType] = useState('Name');

  function handleInput(value: string) {
    onChangeInputValue(value);
  }

  function handleSearch() {
    switch (type) {
      case 'Name':
        onSearchCountryName();
        break;
      case 'Language':
        onSearchCountryLanguage();
        break;
      case 'Currency':
        onSearchCountryCurrency();
        break;
      default:
        break;
    }
  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={type}
          id="input-group-dropdown-2"
        >
          <Dropdown.Item onSelect={() => setType('Name')}>Name</Dropdown.Item>
          <Dropdown.Item onSelect={() => setType('Language')}>
            Language
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setType('Currency')}>
            Currency
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup.Prepend>
      <FormControl
        onChange={e => handleInput(e.target.value)}
        placeholder={`Use a country ${type.toLocaleLowerCase()} to search`}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
