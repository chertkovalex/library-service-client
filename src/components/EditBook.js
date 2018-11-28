import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const EditBook = props => {
  const { onInputChange, values, onSave } = props;
  const { _id, author, name, year, pages } = values;
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <Form onSubmit={onSave}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          onChange={onInputChange}
          placeholder="Book Name"
          required
          type="text"
          defaultValue={name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="author">Author</Label>
        <Input
          id="author"
          name="author"
          onChange={onInputChange}
          placeholder="Book author"
          required
          type="text"
          defaultValue={author}
        />
      </FormGroup>
      <FormGroup>
        <Label for="year">Year of publication</Label>
        <Input
          id="year"
          max={currentYear}
          min="-10000"
          name="year"
          onChange={onInputChange}
          placeholder="1991"
          required
          type="number"
          defaultValue={year}
        />
      </FormGroup>
      <FormGroup>
        <Label for="pages">Number of pages</Label>
        <Input
          id="pages"
          name="pages"
          onChange={onInputChange}
          placeholder="0000"
          type="number"
          defaultValue={pages}
        />
      </FormGroup>
      <Button type="submit">{_id ? 'Save' : 'Add'} Book</Button>
      <Button>Clear</Button>
    </Form>
  );
};

export default EditBook;
