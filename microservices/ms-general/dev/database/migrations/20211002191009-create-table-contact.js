module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('contacts', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    default: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('contacts'),
};