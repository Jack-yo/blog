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
        type: STRING(150),
        allowNull: false
      },
      title:{
        type: STRING(200).BINARY,
        allowNull:false
      },
      description:{
        type: STRING(450).BINARY,
        allowNull:true
      },
      page:{
        type:TEXT('medium'),
        allowNull:false
      },
      like:{ type:INTEGER,allowNull:false},
      tags:{type:STRING(30).BINARY},
      created_at: DATE,
      updated_at: DATE,
    });

    return PubArticle;
}
