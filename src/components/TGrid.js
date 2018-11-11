import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';

const ActionsCell = ({ id, onDeleteBook, onEditBook }) => {
  const onDelete = () => {
    onDeleteBook(id);
  };
  const onEdit = () => {
    onEditBook(id);
  };
  return (
    <td>
      <Button color="secondary" size="sm" onClick={onDelete}>
        Del
      </Button>
      <Button color="secondary" size="sm" onClick={onEdit}>
        Edit
      </Button>
    </td>
  );
};

export default class TGrid extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onDeleteBook: PropTypes.func,
    onEditBook: PropTypes.func
  };

  render() {
    const { data, onDeleteBook, onEditBook } = this.props;
    return (
      <Table size="sm" responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Author</th>
            <th>Year</th>
            <th>Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book, key) => {
            const { _id, name, author, year, pages } = book;
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{name}</td>
                <td>{author}</td>
                <td>{year}</td>
                <td>{pages}</td>
                <ActionsCell
                  id={_id}
                  onDeleteBook={onDeleteBook}
                  onEditBook={onEditBook}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
