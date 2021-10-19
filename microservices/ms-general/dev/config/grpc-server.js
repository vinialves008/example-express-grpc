
const grpc = require('grpc');
import path from 'path';


var protoLoader = require("@grpc/proto-loader");
import serviceAddress from '../api/services/address';

import 'dotenv/config';

module.exports = () => {
    const server = new grpc.Server();
    const PROTO_PATH = path.resolve('contracts/address.proto');

    const options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };

    var packageDefinitionAddress = protoLoader.loadSync(PROTO_PATH, options);
    const addressProto = grpc.loadPackageDefinition(packageDefinitionAddress);

    server.addService(addressProto.AddressService.service, serviceAddress)

    return server;
};
