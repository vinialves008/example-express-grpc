import Sequelize, { Model } from 'sequelize';

class UserAddress extends Model {
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
        addressesId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });
  }
}

export default UserAddress;
