'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    const { DATE, STRING } = Sequelize;
    await queryInterface.createTable('user_infos', {
      name: { type: STRING(30).BINARY, primaryKey: true, allowNull: false, unique: true },
      password: { type: STRING(100), allowNull: false },
      email: {
        type: STRING(30),
        allowNull: false,
        unique: false,
        validate: {
          isEmail: true,
        },
      },
      token: { type: STRING(300), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity., Sequelize

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('user_infos');

  },
};
