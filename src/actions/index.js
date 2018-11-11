import config from './../config';
import axios from 'axios';

const { urlPrefix } = config;
const booksUrl = `${urlPrefix}/books`;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const getAllBooks = async () => {
  const res = await (await fetch(booksUrl, {
    method: 'GET',
    headers
  })).json();

  return res.books;
};

export const getBookData = async id => {
  const res = await axios.get(`${booksUrl}/${id}`, {
    data: { id }
  });

  return res.data;
};

export const addBook = async data => {
  return await (await fetch(booksUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })).json();
};

export const updateBook = async data => {
  console.log('updateBook');
  const { _id } = data;
  const res = await (await fetch(`${booksUrl}/${_id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers
  })).json();

  console.log('updateBook res', res);
  return res;
};

export const deleteBook = async id =>
  await axios.delete(booksUrl, {
    data: { id }
  });

export const borrowBook = async id => {
  console.log('borrowBook');
  const res = await (await fetch(`${booksUrl}/${id}/borrow`, {
    method: 'PATCH',
    headers
  })).json();

  console.log('res', res);
};

export const returnBook = async id => {
  console.log('returnBook');
  const res = await (await fetch(`${booksUrl}/${id}/return`, {
    method: 'PATCH',
    headers
  })).json();

  console.log('res', res);
};
