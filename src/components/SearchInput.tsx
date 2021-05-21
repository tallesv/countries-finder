import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

interface SearchInputProps {
  onChangeInputValue: (value: string) => void;
}

export default function SearchInput({
  onChangeInputValue,
}: SearchInputProps): JSX.Element {
  function handleInput(value: string) {
    onChangeInputValue(value);
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        onChange={e => handleInput(e.target.value)}
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Button</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
