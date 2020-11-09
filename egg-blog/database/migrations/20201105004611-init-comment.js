'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {DATE,STRING,INTEGER} = Sequelize;
    return queryInterface.createTable('comments', {
      id:{type:INTEGER,primaryKey: true,autoIncrement:true,unique: true},
      name:{type:STRING(30).BINARY},
      page_id:{type:INTEGER,references:{model:'public_articles',key:'id'}},
      follow_id:{type:INTEGER},
      comment:{type:STRING(450).BINARY},
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      return queryInterface.dropTable('comments');
  }
};
