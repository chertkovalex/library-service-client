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
import { findBookIndexById } from '../helpers';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [], editValues: null };

    this.onSaveBook = this.onSaveBook.bind(this);
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.onEditBook = this.onEditBook.bind(this);
  }

  componentDidMount = async () => {
    const books = await getAllBooks();
    this.setState({ books });
  };

  onSaveBook = async data => {
    try {
      // update book
      if (data._id) {
        await updateBook(data);
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
  };

  onDeleteBook = async id => {
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
  };

  onEditBook = async id => {
    try {
      const { book } = await getBookData(id);
      this.setState({ editValues: book });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { books, editValues } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <EditBook onSave={this.onSaveBook} values={editValues} />
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
