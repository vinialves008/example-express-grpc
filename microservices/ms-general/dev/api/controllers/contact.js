import Contact from '../models/Contact';
import { ObjectNotFoundException } from '../exceptions/ObjectNotFoundException';
import { FieldMessage } from '../utils/fieldmessage';

const addContact = async(params) => {
    const contact = await Contact.create(params);
    return contact;
};

const findOneContact = async(params) => {
    const contact = await Contact.findByPk(params.id);
    if (!contact) {
        throw new ObjectNotFoundException('Contato não encontrado', [
            new FieldMessage('id', 'ID não encontrado.'),
        ]);
    }
    return contact;
};

module.exports = {
    addContact,
    findOneContact,
};