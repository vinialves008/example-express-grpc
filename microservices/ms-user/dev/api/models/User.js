import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          get() {
            return String(this.getDataValue('id'));
          },
        },
        code: Sequelize.STRING,
        password: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        blocked: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.UserAddress, {
      foreignKey: 'userId',
      as: 'addresses',
    });
  }
}

export default User;
