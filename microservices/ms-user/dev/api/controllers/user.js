import bcrypt from 'bcrypt';
import 'dotenv/config';

import ErrorsException from '../exceptions/error';
import FieldMessage from '../exceptions/fieldmessage';
import User from '../models/User';
import UserAddress from '../models/UserAddress';

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

const fetchUsers = async (params) => {
  try {
    const Users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: UserAddress,
          as: 'addresses',
          attributes: ['id'],
        },
      ],
    });

    return Users;
  } catch (e) {
    console.log(e);
    errors.push(new FieldMessage('Users', 'Erro ao listar os Usuários.'));
  }
};
const createUsers = async (params) => {
  const saltRounds = 10;

  const clientAddress = new AddressService(
    `${process.env.MS_ADDRESS_GENERAL}`,
    grpc.credentials.createInsecure()
  );
  const errors = [];
  const { code, password } = params;

  clientAddress.Create(params.address, async (error, address) => {
    if (!error) {
      const { id: addressesId } = address;
      const pass = await bcrypt.hash(password, saltRounds);

      const user = await User.create(
        {
          code,
          password: pass,
          addresses: [{ addressesId }],
        },
        {
          include: [
            {
              model: UserAddress,
              as: 'addresses',
            },
          ],
        }
      );

      return user;
    }
    console.error(error);
    errors.push(new FieldMessage('address', 'Erro ao cadastrar endereço.'));
  });
};

module.exports = {
  fetchUsers,
  createUsers,
};
