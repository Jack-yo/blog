'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { DATE, STRING,TEXT,INTEGER } = Sequelize;
    await queryInterface.createTable('public_articles',{
      id:{type:INTEGER,primaryKey: true,autoIncrement:true,unique: true},
      name:{ type: STRING(30).BINARY,allowNull: false },
      token:{ type: STRING(150),allowNull: false },
      title:{type: STRING(200).BINARY,allowNull:false},
      description:{type:STRING(450).BINARY},
      page:{ type:TEXT('medium'),allowNull:false},
      like:{ type:INTEGER,allowNull:false},
      tags:{type:STRING(30).BINARY},
      created_at: DATE,
      updated_at: DATE,
    })
  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('public_articles');
  }
};
