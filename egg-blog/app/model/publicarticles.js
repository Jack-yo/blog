'use strict';

module.exports = app =>{
    const { STRING,DATE,INTEGER,TEXT } = app.Sequelize;

    const PubArticle = app.model.define('public_article',{
      id:{
        type:INTEGER,
        primaryKey: true,
        autoIncrement:true,
        unique: true
      },
      name:{
        type: STRING(30).BINARY,
        allowNull: false,
      },
      token:{
        type: STRING(300),
        allowNull: false
      },
      title:{
        type: STRING(300).BINARY,
        allowNull:false
      },
      page:{
        type:TEXT('medium'),
        allowNull:false
      },
      created_at: DATE,
      updated_at: DATE,
    });

    return PubArticle;
}
