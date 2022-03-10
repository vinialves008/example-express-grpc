import 'dotenv/config';
// import ValidateException from '../exceptions/validate';
// import FieldMessageException from '../exceptions/fieldmessage';
import controller from '../controllers/address';

const grpc = require('grpc');

const Create = async({ request }, callback) => {
    const address = await controller.addAddress(request);
    callback(false, address);
};

const List = async({ request }, callback) => {
    callback(false, []);
};

const FindById = async({ request }, callback) => {
    try {
        const address = await controller.findById(request);
        callback(false, address);

    } catch (error) {
        callback(true, {});
    }

};

module.exports = {
    Create,
    List,
    FindById,
};