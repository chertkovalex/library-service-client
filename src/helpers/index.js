/**
 *
 * @param form
 * @param clear
 * @param add
 * @returns {Object}
 */
export const extractFormData = ({ form, clear, add }) => {
  return [].slice
    .call(form.elements)
    .filter(el => el.nodeName === 'INPUT' && el.value.length > 0)
    .reduce((formData, input) => {
      const value = input.value;
      if (clear) {
        input.value = '';
      }
      return {
        ...formData,
        [input.name]: value
      };
    }, add);
};
/**
 *
 * @param books
 * @param id
 * @returns {Object}
 */
export const findBookById = (books, id) => books.find(book => book._id === id);
/**
 *
 * @param books: Array
 * @param id: String
 * @returns Number
 */
export const findBookIndexById = (books, id) =>
  books.findIndex(book => book._id === id);
