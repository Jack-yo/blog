'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const User = app.model.define('user_info', {
    name: {
      type: STRING(30).BINARY,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(100), allowNull: false,
    },
    email: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    token: {
      type: STRING(300), allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
