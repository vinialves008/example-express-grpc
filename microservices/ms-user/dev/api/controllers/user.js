import bcrypt from 'bcrypt';
import 'dotenv/config';

import FieldMessage from '../utils/fieldmessage';
import User from '../models/User';
import UserAddress from '../models/UserAddress';

import { BadRequestException } from '../exceptions/BadRequestException';
import { UserDTO } from '../models/dto/UserDTO';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './dev/api/contracts/address.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const productproto = grpc.loadPackageDefinition(packageDefinition);

const AddressService = productproto.AddressService;

const fetchUsers = async(params) => {
    try {
        const usersDTO = [];
        const clientAddress = new AddressService(
            `${process.env.MS_ADDRESS_GENERAL}`,
            grpc.credentials.createInsecure()
        );

        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
            include: [{
                model: UserAddress,
                as: 'userAddress',
                attributes: ['id', 'addressesId'],
            }, ],
        });

        await Promise.all(
            users.map(
                (user) =>
                new Promise((resolve, reject) =>
                    clientAddress.FindById({ id: user.userAddress.addressesId }, async(error, address) => {
                        if (!error) {
                            usersDTO.push(new UserDTO(user, address));
                            return resolve(address);
                        }
                        return reject(error);
                    })
                )
            )
        );

        return usersDTO;
    } catch (e) {
        console.log(e);
        throw new BadRequestException('Erro ao buscar usuários');
    }
};

const createUsers = async(params) => {
    const saltRounds = 10;

    const clientAddress = new AddressService(
        `${process.env.MS_ADDRESS_GENERAL}`,
        grpc.credentials.createInsecure()
    );
    const errors = [];

    const { name, email, password } = params;
    const pass = await bcrypt.hash(password, saltRounds);

    const address = await new Promise((resolve, reject) =>
        clientAddress.Create(params.address, async(error, address) => {
            if (!error) {
                // const { id: addressesId } = address;
                // addresses.push({ addressesId });
                resolve(address);
            }
            console.log(error);
            return reject(error);
        })
    ).catch((err) => {
        throw new BadRequestException('Não foi possível cadastrar endereço');
    });

    const user = await User.create({
        name,
        email,
        password: pass,
        userAddress: { addressesId: address.id },
    }, {
        include: [{
            model: UserAddress,
            as: 'userAddress',
        }, ],
    });

    return new UserDTO(user, address);
};

module.exports = {
    fetchUsers,
    createUsers,
};