import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

interface SearchInputProps {
  onChangeInputValue: (value: string) => void;
  onClickButton: () => void;
}

export default function SearchInput({
  onChangeInputValue,
  onClickButton,
}: SearchInputProps): JSX.Element {
  function handleInput(value: string) {
    onChangeInputValue(value);
  }

  function handleSearch() {
    onClickButton();
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        onChange={e => handleInput(e.target.value)}
        placeholder="Search for a country"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
