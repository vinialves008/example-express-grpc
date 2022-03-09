import * as yup from 'yup';

const idValid = (id) => !Number.isNaN(id) && Number.isInteger(+id) && typeof id !== 'object';

module.exports = {};