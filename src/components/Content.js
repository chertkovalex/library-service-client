import React from 'react';

import BottomAppBar from './BottomAppBar';
import MTable from './MTable';
import EditBook from './EditBook';

import {
  getAllBooks,
  addBook,
  deleteBook,
  updateBook,
  getBookData
} from '../actions';
import { findBookIndexById, getCorrectTypeValue } from '../helpers';

const defaultValues = { name: '', author: '', year: '', pages: undefined };

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [], values: defaultValues, isEditing: false };

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

    const values = this.state.values || defaultValues;

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

        this.setState({ books });
        return this.closeEditDialog();
      }

      const newBook = await addBook(data);
      const { books } = this.state;
      const newBooks = [...books, newBook];

      this.setState({ books: newBooks });
      return this.closeEditDialog();
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

  onAddBook = () => {
    this.setState({ values: defaultValues, isEditing: true });
  };

  closeEditDialog = () => {
    this.setState({ isEditing: false });
  };

  onEditBook = async id => {
    try {
      const { book } = await getBookData(id);
      this.setState({ values: book, isEditing: true });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { books, values, isEditing } = this.state;

    const data = books.map(book => {
      const { _id, name, author, year, pages } = book;
      return { id: _id, name, author, year, pages };
    });

    const editBookProps = {
      onClose: this.closeEditDialog,
      onInputChange: this.onInputChange,
      onSave: this.onSubmit,
      open: isEditing,
      values
    };

    return (
      <div>
        <MTable
          data={data}
          onDelete={this.onDeleteBook}
          onEdit={this.onEditBook}
        />
        <BottomAppBar onAddBook={this.onAddBook} />
        <EditBook {...editBookProps} />
      </div>
    );
  }
}
