const grpc = require('grpc');


import 'dotenv/config';
import ValidateException from '../exceptions/validate';
import FieldMessageException from '../exceptions/fieldmessage';
import controller from "../controllers/address";


const Create = async ({ request }, callback) => {
    const address = await controller.addAddress(request);
    callback(false, address);
};

const List = async ({ request }, callback) => {
    callback(false, []);
};

module.exports = {
    Create,
    List,
}