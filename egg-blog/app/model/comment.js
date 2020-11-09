'use strict';

module.exports = app =>{
  const {STRING,INTEGER } = app.Sequelize;
  const Comment = app.model.define('comment',{
    id:{type:INTEGER,primaryKey: true,autoIncrement:true,unique: true},
    name:{type:STRING(30).BINARY},
    pageId:{type:INTEGER,references:{model:'public_articles',key:'id'}},
    followId:{type:INTEGER},
    comment:{type:STRING(450).BINARY},
  });
  return Comment;
}
