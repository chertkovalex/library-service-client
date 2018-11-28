import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import EditBook from './EditBook';
import TGrid from './TGrid';

import {
  getAllBooks,
  addBook,
  deleteBook,
  updateBook,
  getBookData
} from '../actions';
import { findBookIndexById, getCorrectTypeValue } from '../helpers';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [], values: {} };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onEditBook = this.onEditBook.bind(this);
  }

  componentDidMount = async () => {
    const books = await getAllBooks();
    this.setState({ books });
  };

  onInputChange(e) {
    const target = e.target;
    const { name, value } = target;

    const values = this.state.values || {};

    const newValues = Object.assign({}, values, {
      [name]: getCorrectTypeValue(value)
    });

    this.setState({ values: newValues });
  }

  onSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { values } = this.state;
    console.log('submit data', values);
    this.onSaveBook(values);
  }

  async onSaveBook(data) {
    try {
      // update book
      if (data._id) {
        const dataToSend = {
          _id: data._id,
          pages: data.pages,
          year: data.year
        };

        const res = await updateBook(dataToSend);
        console.log('res update', res);
        // request new full list to refresh
        const books = await getAllBooks();

        return this.setState({ books });
      }

      const newBook = await addBook(data);
      const { books } = this.state;
      const newBooks = [...books, newBook];

      return this.setState({ books: newBooks });
    } catch (e) {
      console.log(e);
    }
  }

  async onDeleteBook(id) {
    try {
      const res = await deleteBook(id);
      if (res.data && res.data.deleted === true) {
        const { books } = this.state;
        const bookIndex = findBookIndexById(books, id);
        const newBooks = [
          ...books.slice(0, bookIndex),
          ...books.slice(bookIndex + 1)
        ];
        this.setState({ books: newBooks });
      }
    } catch (e) {
      console.log(e);
    }
  }

  onEditBook = async id => {
    try {
      const { book } = await getBookData(id);
      this.setState({ values: book });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { books, values } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <EditBook
              onSave={this.onSubmit}
              values={values}
              onInputChange={this.onInputChange}
            />
          </Col>
          <Col>
            <TGrid
              data={books}
              onDeleteBook={this.onDeleteBook}
              onEditBook={this.onEditBook}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
