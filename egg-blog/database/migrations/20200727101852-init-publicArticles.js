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
      name:{ type: STRING(30).BINARY,  allowNull: false,  },
      token:{ type: STRING(300),allowNull: false },
      title:{type: STRING(300).BINARY,allowNull:false},
      page:{ type:TEXT('medium'),allowNull:false},
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
