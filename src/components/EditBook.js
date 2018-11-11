import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    values: PropTypes.shape({
      author: PropTypes.string,
      _id: PropTypes.string,
      name: PropTypes.string,
      pages: PropTypes.number,
      year: PropTypes.number
    })
  };

  static getDerivedStateFromProps = (props, state) =>
    state.values !== props.values ? { values: props.values } : {};

  handleInputChange(e) {
    const target = e.target;
    const { name, value } = target.value;

    const { values } = this.state;

    const newValues = Object.assign({}, values, { [name]: value });

    this.setState({ values: newValues });
  }
  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { values } = this.state;

    console.log('submit data', values);
    this.props.onSave(values);
  }

  render() {
    const { isNew } = this.props;
    const { author, name, year, pages } = this.state.values || {};
    const currentYear = new Date(Date.now()).getFullYear();
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
            placeholder="0000"
            type="number"
            defaultValue={pages}
          />
        </FormGroup>
        <Button type="submit">{isNew ? 'Add' : 'Save'} Book</Button>
        <Button>Clear</Button>
      </Form>
    );
  }
}
