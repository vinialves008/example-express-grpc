module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            activated: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            blocked: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            activated_at: {
                type: Sequelize.DATE,
                allowNull: false,
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

    down: (queryInterface) => queryInterface.dropTable('users'),
};