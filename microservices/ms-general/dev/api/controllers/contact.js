import Contact from '../models/Contact';

const addContact = async (params) => {
    const contact = await Contact.create(params);
    return contact;
};
const findOneContact = async (params) => {
    const contact = await Contact.findByPk(params.id);
    return contact;
};


module.exports = {
    addContact,
    findOneContact,
}