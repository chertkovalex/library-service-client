import config from './../config';
import axios from 'axios';

const { urlPrefix } = config;
const booksUrl = `${urlPrefix}/books`;

export const getAllBooks = async () => {
  const res = await axios.get(booksUrl);

  return res.data.books;
};

export const getBookData = async id => {
  const res = await axios.get(`${booksUrl}/${id}`, {
    data: { id }
  });

  return res.data;
};

export const addBook = async data => {
  const res = await axios.post(booksUrl, data);

  return res.data;
};

export const updateBook = async data => {
  const { _id } = data;
  return await axios.patch(`${booksUrl}/${_id}`, data);
};

export const deleteBook = async id =>
  await axios.delete(booksUrl, {
    data: { id }
  });

export const borrowBook = async id => {
  console.log('borrowBook id', id);
  const res = await axios.patch(`${booksUrl}/${id}/borrow`);

  console.log('borrowBook res', res);
  return res;
};

export const returnBook = async id => {
  console.log('returnBook id', id);
  const res = await axios.patch(`${booksUrl}/${id}/return`);

  console.log('returnBook res', res);
  return res;
};
